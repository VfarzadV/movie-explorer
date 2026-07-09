import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MoviesBox from "../components/MoviesBox";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer"
const allMovies = [
    { id: 1, title: "Spider-Man: Across The Spider-Verse", genre: "Fantasy", rating: "8.7", releaseDate: "Nov 2, 2023", description: "In an attempt to catch the Spot...", image: "/spiderman.jpg" },
    { id: 2, title: "Guardians of the Galaxy Vol. 3", genre: "Fantasy", rating: "7.9", releaseDate: "May 5, 2023", description: "Defending the universe...", image: "/guardians.jpg" },
    { id: 3, title: "Avatar: The Way of Water", genre: "Fantasy", rating: "7.6", releaseDate: "December 16, 2022", description: "Jake Sully lives with his newfound family...", image: "/avatar.jpg" },
    { id: 4, title: "Venom: Let There Be Carnage", genre: "Fantasy", rating: "5.9", releaseDate: "October 1, 2021", description: "Eddie Brock tries to revive his career...", image: "/venom.jpg" },
    { id: 5, title: "Chernobyl disaster", genre: "Documentary", rating: "9.3", releaseDate: "April 26, 1986", description: "The Chernobyl disaster began on...", image: "/chernobyl.jpg" },
    { id: 6, title: "Loki", genre: "Action", rating: "8.2", releaseDate: "June 9, 2021", description: "After stealing the Tesseract...", image: "/loki.jpg" },
    { id: 7, title: "Gen V", genre: "Action", rating: "7.9", releaseDate: "Sep 29, 2023", description: "The lives of hormonal, competitive...", image: "/gen-v.jpg" },
    { id: 8, title: "Rick and Morty", genre: "Sitcom", rating: "9.1", releaseDate: "December 2, 2013", description: "Rick, an alcoholic sociopath and scientist...", image: "/rick-and-morty.jpg" },
];

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A]">
                <Navbar />
                <div className="w-[85%] mx-auto flex flex-col items-center mt-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                        Your Gateway to Movie <span className="text-[#CC0000]">Magic</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mb-10 leading-relaxed">
                        Dive into the world of cinema with MovieWatch, where you can search and find everything you want to watch. Your ultimate movie destination awaits!
                    </p>
                    <div className="w-full max-w-3xl mb-12 relative group">
                        <div className="flex items-center w-full bg-[#111111] border border-gray-800 rounded-lg overflow-hidden transition-colors focus-within:border-red-600">
                            <input
                                type="text"
                                placeholder="Search movie you want..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-white px-6 py-4 focus:outline-none w-full"
                            />
                            <button className="bg-[#CC0000] hover:bg-red-700 transition-colors h-full px-6 py-4 flex items-center justify-center">
                                <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        {filteredMovies.length > 0 ? (
                            <MoviesBox movies={filteredMovies} />
                        ) : (
                            <div className="text-center text-gray-500 py-20 text-lg">
                                No movies found for "{searchQuery}"
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-16">
                        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${currentPage === page
                                    ? "bg-[#CC0000] text-white border border-[#CC0000]"
                                    : "bg-[#111111] text-gray-400 border border-gray-800 hover:border-gray-500 hover:text-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <span className="text-gray-600 px-1">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium bg-[#111111] text-gray-400 border border-gray-800 hover:border-gray-500 hover:text-white transition-colors">
                            30
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}