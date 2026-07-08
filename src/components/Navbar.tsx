import { useState } from "react";
import { MagnifyingGlassIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [logIn, setLogIn] = useState(false);
  return (
    <nav className="w-[85%] mx-auto flex items-center justify-between px-8 py-4   text-white">
      <img src="/public/Logo.svg" alt="Logo" className="w-14 h-14" />

      <ul className="flex gap-6 bg-[#0F0F0F] px-6 py-3 rounded-lg border-2 border-[#1F1F1F] text-white ml-[10%] justify-center">
        <Link to="/" className=" px-3 py-2 bg-[#1F1F1F] rounded-lg border border-[#1F1F1F] cursor-pointer hover:text-red-500">Home</Link>
        <Link to="/genre" className="px-3 py-2 cursor-pointer hover:text-red-500">Genre</Link>
        <Link to="/movies" className="px-3 py-2 cursor-pointer hover:text-red-500">Movies</Link>
        <Link to="/tv-shows" className="px-3 py-2 cursor-pointer hover:text-red-500">Tv Shows</Link>
        <Link to="/anime" className="px-3 py-2 cursor-pointer hover:text-red-500">Anime</Link>
        <Link to="/subscription" className="px-3 py-2 cursor-pointer hover:text-red-500">Subscription</Link>
      </ul>

      <div className="flex items-center gap-4  justify-end">
        <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
        {logIn ? (
          <>
            <UserIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
            <span className="text-white">Farhad Vatandoust</span>
            <ChevronDownIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
          </>
        ) : (

          <Link
            to="/LogIn"
            onClick={() => setLogIn(true)}
            className="flex item-center justify-center gap-2.5 px-6 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white font-medium rounded-lg shadow-md shadow-black/40 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <UserIcon className="w-6 h-6  " />
            Sing In / Sing Up
          </Link>
        )}
      </div>
    </nav>
  );
}
