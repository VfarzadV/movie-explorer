import type { MovieType } from "../types";
import { Link } from "react-router-dom";
import { genreMap } from "../services/genres";

interface MoviesBoxProps {
    movies: MovieType[];
    mediaType?: "movie" | "series";
}

export default function MoviesBox({ movies = [], mediaType = "movie" }: MoviesBoxProps) {
    return (
        <div className="py-8 w-full mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
                {movies.map((movie) => (
                    <Link
                        to={`/${mediaType === "series" ? "series" : "movie"}/${movie.id}`}
                        key={movie.id}
                        className="group cursor-pointer flex flex-col gap-3 p-3 bg-[#111111] border border-[#222222] rounded-2xl shadow-lg shadow-black/50 hover:shadow-black/80 hover:border-gray-600 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative rounded-xl overflow-hidden aspect-2/3">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-gray-300 text-[10px] px-2 py-1 rounded-md">
                                {movie.genre_ids && movie.genre_ids.length > 0
                                    ? movie.genre_ids.slice(0, 2).map(id => genreMap[id]).join(" • ")
                                    : movie.genre}
                            </div>
                        </div>
                        <div className="flex flex-col px-1">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-white font-medium text-sm sm:text-base truncate">
                                    {movie.title}
                                </h3>
                                <span className="bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded">
                                    {movie.rating}
                                </span>
                            </div>
                            <p className="text-gray-400 text-[11px] mt-1">{movie.releaseDate}</p>
                            <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                                {movie.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}