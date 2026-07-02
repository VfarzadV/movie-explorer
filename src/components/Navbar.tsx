import { MagnifyingGlassIcon, UserIcon , ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="w-[85%] mx-auto flex items-center justify-between px-8 py-4   text-white">
      <img src="/public/Logo.svg" alt="Logo" className="w-14 h-14" />

      <ul className="flex gap-6 bg-[#0F0F0F] px-6 py-3 rounded-lg border-2 border-[#1F1F1F] text-white ml-[10%] justify-center">
        <li className=" px-3 py-2 bg-[#1F1F1F] rounded-lg border border-[#1F1F1F] cursor-pointer hover:text-red-500">Home</li>
        <li className="px-3 py-2 cursor-pointer hover:text-red-500">Genre</li>
        <li className="px-3 py-2 cursor-pointer hover:text-red-500">Movies</li>
        <li className="px-3 py-2 cursor-pointer hover:text-red-500">Tv Shows</li>
        <li className="px-3 py-2 cursor-pointer hover:text-red-500">Anime</li>
        <li className="px-3 py-2 cursor-pointer hover:text-red-500">Subscription</li>
      </ul>

      <div className="flex items-center gap-4  justify-end">
        <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
        <UserIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
        <span className="text-white">Farzad Vatandoust</span>
        <ChevronDownIcon className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
      </div>
    </nav>
  );
}
