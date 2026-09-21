flowchart TD
    A((Start)) --> B[Uruchomienie systemu]
    B --> C[Wyświetlenie menu głównego]
    C --> D{Wybór opcji}

    D -->|Zawodnicy| E[Wyświetlenie listy zawodników]
    E --> F{Wybór operacji}

    F -->|Dodaj| G[Wprowadzenie danych zawodnika]
    G --> H[Zapisanie zawodnika]
    H --> E

    F -->|Edytuj| I[Wybór zawodnika]
    I --> J[Zmiana danych zawodnika]
    J --> K[Zapisanie zmian]
    K --> E

    F -->|Usuń| L[Wybór zawodnika]
    L --> M{Potwierdzenie usunięcia}
    M -->|Tak| N[Usunięcie zawodnika]
    N --> E
    M -->|Nie| E

    F -->|Powrót| C

    D -->|Statystyki| O[Wyświetlenie statystyk zawodników]
    O --> C

    D -->|Terminarz| P[Wyświetlenie terminarza meczów]
    P --> C

    D -->|Tabela strzelców| Q[Wyświetlenie tabeli strzelców]
    Q --> C

    D -->|Wyjście| R((Koniec))

