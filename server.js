const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            number INTEGER NOT NULL,
            position TEXT NOT NULL,
            goals INTEGER DEFAULT 0,
            assists INTEGER DEFAULT 0,
            appearances INTEGER DEFAULT 0
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            opponent TEXT NOT NULL,
            match_date TEXT NOT NULL,
            match_time TEXT,
            location TEXT,
            result TEXT DEFAULT '-'
        )
    `);

    db.get("SELECT COUNT(*) AS count FROM players", (err, row) => {
        if (!err && row.count === 0) {
            const players = [
                ["Jan Kowalski", 1, "Bramkarz", 0, 0, 8],
                ["Adam Nowak", 4, "Obrońca", 1, 1, 8],
                ["Piotr Wiśniewski", 5, "Obrońca", 0, 2, 7],
                ["Kamil Wójcik", 8, "Pomocnik", 4, 5, 8],
                ["Michał Kamiński", 10, "Pomocnik", 7, 4, 8],
                ["Jakub Lewandowski", 7, "Napastnik", 11, 3, 8],
                ["Mateusz Zieliński", 9, "Napastnik", 8, 2, 7]
            ];

            const stmt = db.prepare(`
                INSERT INTO players
                (name, number, position, goals, assists, appearances)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            players.forEach(player => stmt.run(player));
            stmt.finalize();
        }
    });

    db.get("SELECT COUNT(*) AS count FROM matches", (err, row) => {
        if (!err && row.count === 0) {
            const matches = [
                ["FC Orzeł", "2026-09-15", "18:00", "Stadion Miejski", "3:1"],
                ["KS Victoria", "2026-09-22", "17:30", "Stadion Miejski", "-"],
                ["LKS Sokół", "2026-10-01", "19:00", "Stadion Miejski", "-"]
            ];

            const stmt = db.prepare(`
                INSERT INTO matches
                (opponent, match_date, match_time, location, result)
                VALUES (?, ?, ?, ?, ?)
            `);

            matches.forEach(match => stmt.run(match));
            stmt.finalize();
        }
    });
});

app.get("/api/players", (req, res) => {
    db.all(
        "SELECT * FROM players ORDER BY goals DESC, name ASC",
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.post("/api/players", (req, res) => {
    const {
        name,
        number,
        position,
        goals = 0,
        assists = 0,
        appearances = 0
    } = req.body;

    if (!name || number === undefined || !position) {
        return res.status(400).json({
            error: "Podaj imię, numer i pozycję."
        });
    }

    db.run(
        `INSERT INTO players
        (name, number, position, goals, assists, appearances)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            name,
            number,
            position,
            goals,
            assists,
            appearances
        ],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.get(
                "SELECT * FROM players WHERE id = ?",
                [this.lastID],
                (err, player) => {
                    res.status(201).json(player);
                }
            );
        }
    );
});

app.put("/api/players/:id", (req, res) => {
    const {
        name,
        number,
        position,
        goals,
        assists,
        appearances
    } = req.body;

    db.run(
        `UPDATE players
         SET name = ?, number = ?, position = ?,
             goals = ?, assists = ?, appearances = ?
         WHERE id = ?`,
        [
            name,
            number,
            position,
            goals,
            assists,
            appearances,
            req.params.id
        ],
        err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Zawodnik zaktualizowany." });
        }
    );
});

app.delete("/api/players/:id", (req, res) => {
    db.run(
        "DELETE FROM players WHERE id = ?",
        [req.params.id],
        err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Zawodnik usunięty." });
        }
    );
});

app.get("/api/matches", (req, res) => {
    db.all(
        "SELECT * FROM matches ORDER BY match_date ASC",
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.post("/api/matches", (req, res) => {
    const {
        opponent,
        match_date,
        match_time,
        location,
        result = "-"
    } = req.body;

    if (!opponent || !match_date) {
        return res.status(400).json({
            error: "Podaj przeciwnika i datę."
        });
    }

    db.run(
        `INSERT INTO matches
        (opponent, match_date, match_time, location, result)
        VALUES (?, ?, ?, ?, ?)`,
        [
            opponent,
            match_date,
            match_time,
            location,
            result
        ],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                id: this.lastID
            });
        }
    );
});

app.put("/api/matches/:id", (req, res) => {
    const {
        opponent,
        match_date,
        match_time,
        location,
        result
    } = req.body;

    db.run(
        `UPDATE matches
         SET opponent = ?, match_date = ?, match_time = ?,
             location = ?, result = ?
         WHERE id = ?`,
        [
            opponent,
            match_date,
            match_time,
            location,
            result,
            req.params.id
        ],
        err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Mecz zaktualizowany." });
        }
    );
});

app.delete("/api/matches/:id", (req, res) => {
    db.run(
        "DELETE FROM matches WHERE id = ?",
        [req.params.id],
        err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Mecz usunięty." });
        }
    );
});

app.listen(PORT, () => {
    console.log("====================================");
    console.log(" SYSTEM ZARZĄDZANIA DRUŻYNĄ");
    console.log("====================================");
    console.log(`Aplikacja: http://localhost:${PORT}`);
});
