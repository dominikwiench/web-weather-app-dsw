# 🌤️ React Weather App

Prosta aplikacja pogodowa stworzona w _React+Typescript_ na potrzeby zaliczenia przedmiotu **"Programowanie Frontend"**, umożliwiająca sprawdzanie bieżących warunków oraz prognozy pogody dla miast na całym świecie. Aplikacja wykorzystuje OpenWeatherMap API oraz zarządzanie stanem.

## 🛠️ Technologie

- **Core:** React 18 (Vite), TypeScript
- **State Management:** Redux Toolkit (Slices, Thunks)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Icons:** React Icons (Weather Icons)

## 📦 Instalacja i uruchomienie

1.  Sklonuj repozytorium.
2.  Wejdź do katalogu i zainstaluj zależności:
    ```bash
    cd web-weather-app-dsw
    npm install
    ```
3.  Skonfiguruj zmienne środowiskowe:
    - Utwórz plik `.env` w głównym katalogu.
    - Dodaj swój klucz API: `VITE_API_KEY=klucz_openweathermap`
    - Dodaj URL: `VITE_API_URL=https://api.openweathermap.org/data/2.5`
4.  Uruchom aplikację:
    ```bash
    npm run dev
    ```
5.  Aplikacja uruchomi się pod http://localhost:5173.
