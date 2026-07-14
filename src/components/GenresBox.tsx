import { Link } from "react-router-dom";
import { genreMap } from "../services/genres";

const featuredGenreIds = [28, 35, 18, 878];

export default function GenresBox() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
            {featuredGenreIds.map((id) => {
                const name = genreMap[id] || "Unknown";
                return (
                    <Link
                        key={id}
                        to={`/genre/${id}`}
                        className="group relative bg-[#111111] h-24 sm:h-28 md:h-32 rounded-xl overflow-hidden cursor-pointer border border-[#222222] hover:border-red-600 transition-all duration-300 block shadow-lg hover:shadow-red-900/20"
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent group-hover:from-red-900/40 transition-colors duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                            <h3 className="text-gray-200 group-hover:text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wider group-hover:scale-110 transition-all duration-300 drop-shadow-2xl">
                                {name}
                            </h3>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}