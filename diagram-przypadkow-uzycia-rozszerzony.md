# Rozszerzony diagram przypadków użycia

## System zarządzania drużyną piłkarską

```mermaid
flowchart LR

    U["Użytkownik"]
    A["Administrator / Trener"]

    subgraph S["SYSTEM ZARZĄDZANIA DRUŻYNĄ PIŁKARSKĄ"]

        UC1(("Zarządzaj zawodnikami"))
        UC2(("Dodaj zawodnika"))
        UC3(("Edytuj zawodnika"))
        UC4(("Usuń zawodnika"))

        UC5(("Wyświetl zawodników"))
        UC6(("Wyświetl statystyki"))
        UC7(("Wyświetl tabelę strzelców"))

        UC8(("Zarządzaj meczami"))
        UC9(("Dodaj mecz"))
        UC10(("Edytuj mecz"))
        UC11(("Usuń mecz"))
        UC12(("Wyświetl terminarz"))

        UC13(("Wprowadź dane zawodnika"))
        UC14(("Waliduj dane"))
        UC15(("Zapisz dane"))
        UC16(("Pobierz dane z bazy"))

    end

    U --- UC5
    U --- UC6
    U --- UC7
    U --- UC12

    A --- UC1
    A --- UC8
    A --- UC5
    A --- UC6
    A --- UC7
    A --- UC12

    UC1 -. "<<include>>" .-> UC2
    UC1 -. "<<include>>" .-> UC3
    UC1 -. "<<include>>" .-> UC4

    UC8 -. "<<include>>" .-> UC9
    UC8 -. "<<include>>" .-> UC10
    UC8 -. "<<include>>" .-> UC11

    UC2 -. "<<include>>" .-> UC13
    UC2 -. "<<include>>" .-> UC14
    UC2 -. "<<include>>" .-> UC15

    UC3 -. "<<include>>" .-> UC13
    UC3 -. "<<include>>" .-> UC14
    UC3 -. "<<include>>" .-> UC15

    UC5 -. "<<include>>" .-> UC16
    UC6 -. "<<include>>" .-> UC16
    UC7 -. "<<include>>" .-> UC16
    UC12 -. "<<include>>" .-> UC16
```

## Opis relacji

### Zarządzaj zawodnikami

Przypadek użycia obejmuje:

- dodawanie zawodnika,
- edytowanie zawodnika,
- usuwanie zawodnika.

### Zarządzaj meczami

Przypadek użycia obejmuje:

- dodawanie meczu,
- edytowanie meczu,
- usuwanie meczu.

### Walidacja danych

Podczas dodawania lub edycji zawodnika system sprawdza,
czy wprowadzone dane są poprawne.

### Zapis danych

Po poprawnej walidacji dane zostają zapisane w bazie danych.

### Pobieranie danych

Wyświetlanie zawodników, statystyk, tabeli strzelców i terminarza
wymaga pobrania odpowiednich danych z bazy.
