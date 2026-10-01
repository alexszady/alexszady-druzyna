flowchart TD
    A((Start)) --> B[Uruchomienie systemu]
    B --> C[Wyświetlenie menu]

    C --> D{Wybór opcji}

    D -->|Zawodnicy| E[Wyświetlenie zawodników]
    D -->|Statystyki| F[Wyświetlenie statystyk]
    D -->|Terminarz| G[Wyświetlenie terminarza]
    D -->|Tabela strzelców| H[Wyświetlenie tabeli strzelców]
    D -->|Wyjście| I((Koniec))

    E --> C
    F --> C
    G --> C
    H --> C
