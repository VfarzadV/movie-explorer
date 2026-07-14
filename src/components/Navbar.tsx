import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";
import type { TMDBMultiSearchResult } from "../types";


export default function Navbar() {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  return (
    <nav className="relative w-[85%] mx-auto flex items-center justify-between px-8 py-4 text-white">
      <img src="/public/Logo.svg" alt="Logo" className="w-14 h-14" />
      <ul className="flex gap-6 bg-[#0F0F0F] px-6 py-3 rounded-lg border-2 border-[#1F1F1F] text-white ml-[10%] justify-center">
        <Link to="/" className="px-3 py-2 bg-[#1F1F1F] rounded-lg border border-[#1F1F1F] cursor-pointer hover:text-red-500">Home</Link>
        <Link to="/genre" className="px-3 py-2 cursor-pointer hover:text-red-500">Genre</Link>
        <Link to="/MoviesPage" className="px-3 py-2 cursor-pointer hover:text-red-500">Movies</Link>
        <Link to="/series" className="px-3 py-2 cursor-pointer hover:text-red-500">Series</Link>
        <Link to="/anime" className="px-3 py-2 cursor-pointer hover:text-red-500">Anime</Link>
        <Link to="/Subscriptions" className="px-3 py-2 cursor-pointer hover:text-red-500">Subscription</Link>
      </ul>
      <div className="flex items-center gap-4 justify-end relative">
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-64 bg-[#111111] border border-red-600 rounded-lg px-3 py-2' : 'w-10 bg-transparent border-transparent'
          }`}>
          {!isSearchOpen ? (
            <MagnifyingGlassIcon
              className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            />
          ) : (
            <>
              <input
                type="text"
                autoFocus
                placeholder="Movies, Series..."
                className="bg-transparent text-white focus:outline-none text-sm w-full placeholder-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <XMarkIcon className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500" onClick={closeSearch} />
            </>
          )}
        </div>
        {isSearchOpen && results.length > 0 && (
          <div className="absolute top-16 right-0 w-72 bg-[#1A1A1A] border border-gray-700 rounded-lg shadow-2xl z-50 p-2 flex flex-col gap-1">
            {results.map(item => (
              <Link
                to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}
                key={item.id}
                onClick={closeSearch}
                className="flex items-center gap-3 p-2 hover:bg-[#252525] rounded-md transition-colors"
              >
                <img
                  src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '/placeholder.jpg'}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white truncate w-48">
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
          <div className="flex items-center gap-3 ml-2">
            <UserIcon className="w-6 h-6 text-red-500" />
            <span className="text-white font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="bg-[#111111] hover:bg-gray-800 text-white px-3 py-1.5 rounded-md border border-gray-700 transition-colors cursor-pointer text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/LogIn"
            className="flex item-center justify-center gap-2.5 px-6 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ml-2"
          >
            <UserIcon className="w-6 h-6" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}