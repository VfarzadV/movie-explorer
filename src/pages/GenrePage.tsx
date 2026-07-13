import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { genreMap } from "../services/genres";
import { Link } from "react-router-dom";

export default function GenrePage() {
    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] min-h-screen flex flex-col">
            <Navbar />
            
            <div className="w-[85%] mx-auto flex flex-col mt-20 flex-1">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Explore by <span className="text-[#CC0000]">Genre</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Discover movies from your favorite categories. From thrilling action to heartwarming romance, we have it all.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
                    {Object.entries(genreMap).map(([id, name]) => (
                        <Link 
                            key={id} 
                            to={`/genre/${id}`} 
                            className="group relative h-32 sm:h-40 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-300 bg-[#111111] shadow-lg flex items-center justify-center hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:from-red-900/30 group-hover:to-black transition-colors duration-500"></div>
                            
                            <h3 className="relative z-10 text-white text-xl md:text-2xl font-semibold tracking-wide group-hover:scale-110 group-hover:text-red-500 transition-all duration-300">
                                {name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}