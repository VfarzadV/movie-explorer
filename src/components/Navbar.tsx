import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, UserIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";
import type { TMDBMultiSearchResult } from "../types";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMultiSearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length <= 2) return;
    const timer = setTimeout(() => {
      fetch(apiEndpoints.searchMulti(query))
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            const filtered = data.results
              .filter((item: TMDBMultiSearchResult) => item.media_type === "movie" || item.media_type === "tv")
              .slice(0, 5);
            setResults(filtered);
          }
        })
        .catch(err => console.error("Error searching:", err));
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
    setResults([]);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Genre", path: "/genre" },
    { name: "Movies", path: "/MoviesPage" },
    { name: "Series", path: "/series" },
    { name: "Anime", path: "/anime" },
    { name: "Subscription", path: "/Subscriptions" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  return (
    <nav className="relative w-[85%] mx-auto flex items-center justify-between px-2 md:px-8 py-4 text-white z-50">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          className="xl:hidden p-1 text-gray-300 hover:text-white cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
        <img src="/public/Logo.svg" alt="Logo" className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <ul className="hidden xl:flex gap-6 bg-[#0F0F0F] px-6 py-3 rounded-lg border-2 border-[#1F1F1F] text-white justify-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="px-3 py-2 cursor-pointer hover:text-red-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-2 md:gap-4 justify-end relative">
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-36 sm:w-48 md:w-64 bg-[#111111] border border-red-600 rounded-lg px-2 md:px-3 py-1.5 md:py-2' : 'w-8 md:w-10 bg-transparent border-transparent'}`}>
          {!isSearchOpen ? (
            <MagnifyingGlassIcon
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            />
          ) : (
            <>
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                className="bg-transparent text-white focus:outline-none text-xs md:text-sm w-full placeholder-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <XMarkIcon className="w-4 h-4 md:w-5 md:h-5 cursor-pointer text-gray-400 hover:text-red-500 shrink-0" onClick={closeSearch} />
            </>
          )}
        </div>
        {isSearchOpen && results.length > 0 && (
          <div className="absolute top-14 right-0 w-60 md:w-72 bg-[#1A1A1A] border border-gray-700 rounded-lg shadow-2xl z-50 p-2 flex flex-col gap-1">
            {results.map(item => (
              <Link
                to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}
                key={item.id}
                onClick={closeSearch}
                className="flex items-center gap-3 p-2 hover:bg-[#252525] rounded-md transition-colors"
              >
                <img
                  src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '/placeholder.jpg'}
                  className="w-10 h-14 object-cover rounded shrink-0"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs md:text-sm font-medium text-white truncate">
                    {item.title || item.name}
                  </span>
                  <span className="text-[10px] bg-[#CC0000] text-white w-max px-1.5 py-0.5 rounded mt-1">
                    {item.media_type === 'tv' ? 'TV Show' : 'Movie'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {user ? (
          <div className="flex items-center gap-2 md:gap-3 ml-1 md:ml-2">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-red-500 hidden sm:block" />
            <span className="text-white font-medium hidden sm:block text-sm">{user.name}</span>
            <button
              onClick={logout}
              className="bg-[#111111] hover:bg-gray-800 text-white px-2 md:px-3 py-1.5 rounded-md border border-gray-700 transition-colors cursor-pointer text-xs md:text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/LogIn"
            className="flex items-center justify-center gap-1.5 md:gap-2.5 px-3 md:px-6 py-1.5 md:py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ml-1 md:ml-2"
          >
            <UserIcon className="w-4 h-4 md:w-5 md:h-5 md:hidden" />
            <span className="hidden md:inline text-sm md:text-base">Sign In</span>
          </Link>
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg mt-2 flex flex-col p-4 shadow-2xl xl:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-white border-b border-[#1F1F1F] last:border-0 hover:bg-[#1A1A1A] hover:text-red-500 rounded-md transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}