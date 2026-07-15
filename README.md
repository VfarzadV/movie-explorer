<div align="center">
  <img src="public/Logo.svg" alt="MovieWatch Logo" width="120" />
  
  # 🍿 MovieWatch (Movie Explorer)
  
  **Your Ultimate Gateway to Cinema, TV Shows, and Anime.**
  
  [![Deploy with Vercel](https://vercelbadge.vercel.app/api/FarhadVatandoust/movie-explorer)](https://vercel.com/new/clone?repository-url=https://github.com/FarhadVatandoust/movie-explorer)
  <br />
  [![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](#)

  ### 🚀 [**Live Demo: Experience MovieWatch**](https://movie-explorer-three-plum.vercel.app/)
</div>

---


## 📋 Table of Contents
- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Under The Hood (Architecture)](#-under-the-hood)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 📖 About The Project

**MovieWatch** is a modern, feature-rich Single Page Application (SPA) designed to help users discover, track, and explore thousands of movies, TV series, and anime. Powered by the **TMDB (The Movie Database) API**, the platform offers a seamless streaming-service-like interface with dynamic data rendering, robust state management, and a pixel-perfect responsive design.

---

## ✨ Key Features

- **🔍 Live Multi-Search Engine:** Instant global search for movies and TV shows.
- **📌 Smart Watchlist:** Curate your personal watchlist, persistently stored using `localStorage`.
- **🔐 Custom Authentication Flow:** Beautiful Sign-In and Sign-Up forms featuring client-side validation and `SweetAlert2` interactive alerts.
- **🎬 Cinematic Trailer Modal:** Watch official YouTube trailers directly within the app without redirection.
- **📱 100% Responsive Design:** Mobile-first approach using Tailwind CSS, ensuring a flawless layout across all devices.
- **💬 User Reviews System:** Real user reviews fetched from TMDB, alongside a functional mock comment submission UI.
- **📄 Advanced Pagination:** Smooth transitions for extensive lists using `rc-pagination`.

---

## 🧠 Under The Hood

This project implements several advanced React patterns to ensure scalability and performance:

*   **Custom Contexts for State Management:** Instead of prop-drilling, `AuthContext` and `WatchlistContext` manage global states, providing a clean and maintainable architecture.
*   **API Debouncing:** The live search input implements a `setTimeout` debounce mechanism (500ms) to significantly reduce unnecessary API calls to TMDB, preventing rate-limiting and improving performance.
*   **Separation of Concerns:** All TMDB API endpoints and logic are isolated in the `services/` directory, keeping React components clean and focused strictly on the UI.
*   **Strict Typing:** Extensive use of TypeScript interfaces (`types.ts`) ensures data consistency across API responses, Contexts, and Component Props.

---

## 💻 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, @heroicons/react
- **Routing:** React Router v6
- **Notifications:** SweetAlert2
- **Data Source:** TMDB API REST endpoints

---

## 📂 Folder Structure

```text
src/
├── components/       # Reusable UI components (Navbar, MoviesBox, etc.)
├── context/          # Global state management (Auth, Watchlist)
├── pages/            # Main route views (Home, MovieDetail, Anime, etc.)
├── services/         # API logic and endpoints (tmdb.ts, genres.ts)
├── App.tsx           # Root component
├── router.tsx        # Application routing configuration
├── types.ts          # Global TypeScript interfaces and types
└── main.tsx          # Application entry point

🚀 Getting Started

Follow these instructions to set up the project locally.
Prerequisites

    Node.js installed (v16+ recommended)

    npm or yarn

Installation

    Clone the repo
    Bash

    git clone [https://github.com/VfarzadV/movie-explorer.git]

    Install NPM packages
    Bash

    cd movie-explorer
    npm install

    Set up Environment Variables
    Create a .env file in the root directory and add your TMDB API Key:
    Code snippet

    VITE_TMDB_API_KEY=your_api_key_here

    Start the development server
    Bash

    npm run dev

🗺️ Roadmap

    [x] Initial UI/UX Design & Routing

    [x] TMDB API Integration (Trending, Genres, Search)

    [x] Watchlist & Local Storage Implementation

    [x] Trailer playback integration

    [ ] Add React Query for advanced data caching

    [ ] Implement Skeleton Loading for smoother UX

    [ ] Backend integration for real user authentication

👤 Author

Farzad Vatandoust

    GitHub: VfatzadV

    Email: farzadvatandoust.ps@gmail.com
