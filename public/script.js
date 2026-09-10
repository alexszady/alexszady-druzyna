let players = [];
let matches = [];

document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
    try {
        const playersResponse = await fetch("/api/players");
        const matchesResponse = await fetch("/api/matches");

        players = await playersResponse.json();
        matches = await matchesResponse.json();

        renderPlayers();
        renderMatches();
        renderScorers();
        updateDashboard();
    } catch (error) {
        console.error(error);
        alert("Nie można połączyć się z serwerem.");
    }
}

function showPage(page) {
    document.querySelectorAll(".page").forEach(element => {
        element.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");
}

function updateDashboard() {
    document.getElementById("playersCount").textContent =
        players.length;

    document.getElementById("goalsCount").textContent =
        players.reduce((sum, player) => sum + Number(player.goals), 0);

    document.getElementById("assistsCount").textContent =
        players.reduce((sum, player) => sum + Number(player.assists), 0);

    document.getElementById("matchesCount").textContent =
        matches.length;
}

function renderPlayers() {
    const table = document.getElementById("playersTable");

    if (!players.length) {
        table.innerHTML = `
            <tr>
                <td colspan="7">Brak zawodników.</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = players.map(player => `
        <tr>
            <td>#${player.number}</td>

            <td>
                <strong>${escapeHtml(player.name)}</strong>
            </td>

            <td>${escapeHtml(player.position)}</td>

            <td>${player.appearances}</td>

            <td><strong>${player.goals}</strong></td>

            <td>${player.assists}</td>

            <td>
                <button
                    class="delete"
                    onclick="deletePlayer(${player.id})">
                    🗑 Usuń
                </button>
            </td>
        </tr>
    `).join("");
}

function renderMatches() {
    const container = document.getElementById("matchesList");

    if (!matches.length) {
        container.innerHTML = `
            <div class="match">
                Brak meczów w terminarzu.
            </div>
        `;
        return;
    }

    container.innerHTML = matches.map(match => `
        <div class="match">

            <h3>
                ⚽ Moja drużyna
                <span> VS </span>
                🏆 ${escapeHtml(match.opponent)}
            </h3>

            <p>
                📅 ${formatDate(match.match_date)}
            </p>

            <p>
                ⏰ ${match.match_time || "Brak godziny"}
            </p>

            <p>
                📍 ${escapeHtml(match.location || "Brak miejsca")}
            </p>

            <p>
                🏆 Wynik:
                <strong>${escapeHtml(match.result || "-")}</strong>
            </p>

            <button
                class="delete"
                onclick="deleteMatch(${match.id})">
                🗑 Usuń mecz
            </button>

        </div>
    `).join("");
}

function renderScorers() {
    const table = document.getElementById("scorersTable");

    const sorted = [...players].sort(
        (a, b) => Number(b.goals) - Number(a.goals)
    );

    table.innerHTML = sorted.map((player, index) => `
        <tr>
            <td>
                <strong>${index + 1}</strong>
            </td>

            <td>
                <strong>${escapeHtml(player.name)}</strong>
            </td>

            <td>${escapeHtml(player.position)}</td>

            <td>${player.appearances}</td>

            <td>${player.assists}</td>

            <td>
                <strong style="color:#16a34a">
                    ${player.goals} ⚽
                </strong>
            </td>
        </tr>
    `).join("");
}

function openPlayerForm() {
    document.getElementById("playerForm")
        .classList.remove("hidden");
}

function closePlayerForm() {
    document.getElementById("playerForm")
        .classList.add("hidden");
}

async function addPlayer() {
    const name = document.getElementById("playerName").value;
    const number = document.getElementById("playerNumber").value;
    const position = document.getElementById("playerPosition").value;
    const goals = document.getElementById("playerGoals").value;
    const assists = document.getElementById("playerAssists").value;
    const appearances =
        document.getElementById("playerAppearances").value;

    if (!name || !number || !position) {
        alert("Uzupełnij imię, numer i pozycję.");
        return;
    }

    await fetch("/api/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            number,
            position,
            goals,
            assists,
            appearances
        })
    });

    document.getElementById("playerName").value = "";
    document.getElementById("playerNumber").value = "";
    document.getElementById("playerPosition").value = "";
    document.getElementById("playerGoals").value = 0;
    document.getElementById("playerAssists").value = 0;
    document.getElementById("playerAppearances").value = 0;

    closePlayerForm();

    await loadData();
}

async function deletePlayer(id) {
    const player = players.find(p => p.id === id);

    if (!confirm(
        `Czy na pewno usunąć ${player?.name || "zawodnika"}?`
    )) {
        return;
    }

    await fetch(`/api/players/${id}`, {
        method: "DELETE"
    });

    await loadData();
}

function openMatchForm() {
    document.getElementById("matchForm")
        .classList.remove("hidden");
}

function closeMatchForm() {
    document.getElementById("matchForm")
        .classList.add("hidden");
}

async function addMatch() {
    const opponent =
        document.getElementById("opponent").value;

    const match_date =
        document.getElementById("matchDate").value;

    const match_time =
        document.getElementById("matchTime").value;

    const location =
        document.getElementById("matchLocation").value;

    const result =
        document.getElementById("matchResult").value || "-";

    if (!opponent || !match_date) {
        alert("Podaj przeciwnika i datę.");
        return;
    }

    await fetch("/api/matches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            opponent,
            match_date,
            match_time,
            location,
            result
        })
    });

    document.getElementById("opponent").value = "";
    document.getElementById("matchDate").value = "";
    document.getElementById("matchTime").value = "";
    document.getElementById("matchLocation").value = "";
    document.getElementById("matchResult").value = "-";

    closeMatchForm();

    await loadData();
}

async function deleteMatch(id) {
    if (!confirm("Czy na pewno usunąć ten mecz?")) {
        return;
    }

    await fetch(`/api/matches/${id}`, {
        method: "DELETE"
    });

    await loadData();
}

function formatDate(date) {
    if (!date) return "-";

    const parts = date.split("-");

    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
