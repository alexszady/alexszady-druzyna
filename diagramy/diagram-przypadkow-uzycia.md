
# Diagram przypadków użycia – System zarządzania drużyną piłkarską

## Diagram podstawowy

```mermaid
flowchart LR

    U["Użytkownik"]
    A["Administrator / Trener"]

    subgraph S["SYSTEM ZARZĄDZANIA DRUŻYNĄ PIŁKARSKĄ"]

        UC1(("Wyświetl zawodników"))
        UC2(("Wyświetl statystyki"))
        UC3(("Wyświetl terminarz"))
        UC4(("Wyświetl tabelę strzelców"))
        UC5(("Dodaj zawodnika"))
        UC6(("Edytuj zawodnika"))
        UC7(("Usuń zawodnika"))
        UC8(("Dodaj mecz"))
        UC9(("Edytuj mecz"))
        UC10(("Usuń mecz"))

    end

    U --- UC1
    U --- UC2
    U --- UC3
    U --- UC4

    A --- UC1
    A --- UC2
    A --- UC3
    A --- UC4
    A --- UC5
    A --- UC6
    A --- UC7
    A --- UC8
    A --- UC9
    A --- UC10
```

## Aktorzy

### Użytkownik

Może:

- wyświetlać zawodników,
- przeglądać statystyki,
- przeglądać terminarz,
- przeglądać tabelę strzelców.

### Administrator / Trener

Może dodatkowo:

- dodawać zawodników,
- edytować zawodników,
- usuwać zawodników,
- dodawać mecze,
- edytować mecze,
- usuwać mecze.
