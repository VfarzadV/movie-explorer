import { Link } from "react-router-dom";
import { genreMap } from "../services/genres";

const featuredGenreIds = [28, 35, 18, 878];

export default function GenresBox() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {featuredGenreIds.map((id) => {
                const name = genreMap[id];
                return (
                    <Link
                        key={id}
                        to={`/genre/${id}`}
                        className="group relative h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-colors block shadow-lg"
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-red-900/50 transition-colors duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide group-hover:scale-110 group-hover:text-red-500 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {name}
                            </h3>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}