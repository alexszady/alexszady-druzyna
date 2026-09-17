# System zarządzania drużyną piłkarską

## 1. Opis projektu

Projekt przedstawia system przeznaczony do zarządzania informacjami
o drużynie piłkarskiej.

System umożliwia przechowywanie, przeglądanie oraz zarządzanie
informacjami dotyczącymi zawodników i meczów.

Głównym celem projektu jest uporządkowanie danych drużyny oraz
umożliwienie użytkownikom łatwego dostępu do najważniejszych
informacji.

---

## 2. Główne funkcjonalności

System umożliwia:

- wyświetlanie listy zawodników,
- dodawanie zawodników,
- edytowanie danych zawodników,
- usuwanie zawodników,
- wyświetlanie statystyk zawodników,
- wyświetlanie terminarza meczów,
- wyświetlanie tabeli strzelców,
- zarządzanie informacjami o meczach.

---

## 3. Aktorzy systemu

### Użytkownik

Użytkownik może przeglądać informacje dotyczące drużyny.

Ma możliwość:

- wyświetlania zawodników,
- wyświetlania statystyk,
- przeglądania terminarza,
- przeglądania tabeli strzelców.

### Administrator / Trener

Administrator lub trener odpowiada za zarządzanie danymi drużyny.

Ma możliwość:

- dodawania zawodników,
- edytowania zawodników,
- usuwania zawodników,
- dodawania meczów,
- edytowania meczów,
- usuwania meczów.

---

## 4. Dokumentacja projektu

### Aktorzy

Opis aktorów systemu:

[Dokumentacja aktorów](docs/aktorzy.md)

### Wymagania

Lista wymagań funkcjonalnych i niefunkcjonalnych:

[Wymagania systemu](docs/wymagania.md)

---

## 5. Diagramy

Diagramy systemu znajdują się w folderze:

`diagramy/`

### Diagram przypadków użycia

[Diagram przypadków użycia](diagramy/diagram-przypadkow-uzycia.md)

### Rozszerzony diagram przypadków użycia

[Rozszerzony diagram przypadków użycia](diagramy/diagram-przypadkow-uzycia-rozszerzony.md)

### Diagram aktywności

[Diagram aktywności](diagramy/diagram-aktywnosci.md)

### Diagram sekwencji

[Diagram sekwencji](diagramy/diagram-sekwencji.md)

### Diagram klas

[Diagram klas](diagramy/diagram-klas.md)

---

## 6. Przypadki użycia

Szczegółowe opisy przypadków użycia znajdują się w folderze:

`docs/przypadki-uzycia/`

Lista przypadków użycia:

1. [PU-01 – Wyświetl zawodników](docs/przypadki-uzycia/PU-01-wyswietl-zawodnikow.md)
2. [PU-02 – Dodaj zawodnika](docs/przypadki-uzycia/PU-02-dodaj-zawodnika.md)
3. [PU-03 – Edytuj zawodnika](docs/przypadki-uzycia/PU-03-edytuj-zawodnika.md)
4. [PU-04 – Usuń zawodnika](docs/przypadki-uzycia/PU-04-usun-zawodnika.md)
5. [PU-05 – Wyświetl statystyki](docs/przypadki-uzycia/PU-05-wyswietl-statystyki.md)
6. [PU-06 – Wyświetl terminarz](docs/przypadki-uzycia/PU-06-wyswietl-terminarz.md)
7. [PU-07 – Wyświetl tabelę strzelców](docs/przypadki-uzycia/PU-07-wyswietl-tabele-strzelcow.md)

---

## 7. Struktura projektu

```text
druzyna-obsluga/
│
├── README.md
│
├── diagramy/
│   ├── diagram-przypadkow-uzycia.md
│   ├── diagram-przypadkow-uzycia-rozszerzony.md
│   ├── diagram-aktywnosci.md
│   ├── diagram-sekwencji.md
│   └── diagram-klas.md
│
└── docs/
    ├── aktorzy.md
    ├── wymagania.md
    │
    └── przypadki-uzycia/
        ├── PU-01-wyswietl-zawodnikow.md
        ├── PU-02-dodaj-zawodnika.md
        ├── PU-03-edytuj-zawodnika.md
        ├── PU-04-usun-zawodnika.md
        ├── PU-05-wyswietl-statystyki.md
        ├── PU-06-wyswietl-terminarz.md
        └── PU-07-wyswietl-tabele-strzelcow.md
