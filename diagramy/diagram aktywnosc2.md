# Diagram aktywności

```mermaid
flowchart TD
    START((Start)) --> A[Uruchomienie systemu]
    A --> B[Wyświetlenie menu głównego]
    B --> C{Wybór opcji}

    C -->|Zawodnicy| D[Wyświetlenie listy zawodników]
    D --> E{Wybór operacji}

    E -->|Dodaj zawodnika| F[Wprowadzenie danych zawodnika]
    F --> G[Zapisanie zawodnika]
    G --> D

    E -->|Edytuj zawodnika| H[Wybór zawodnika]
    H --> I[Edycja danych zawodnika]
    I --> J[Zapisanie zmian]
    J --> D

    E -->|Usuń zawodnika| K[Wybór zawodnika]
    K --> L{Potwierdzenie usunięcia}

    L -->|Tak| M[Usunięcie zawodnika]
    M --> D

    L -->|Nie| D

    E -->|Powrót| B

    C -->|Statystyki| N[Wyświetlenie statystyk zawodników]
    N --> B

    C -->|Terminarz| O[Wyświetlenie terminarza meczów]
    O --> B

    C -->|Tabela strzelców| P[Wyświetlenie tabeli strzelców]
    P --> B

    C -->|Wyjście| END((Koniec))
