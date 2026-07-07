
import type { MovieType } from "../types";



interface MoviesBoxProps {
  movies: MovieType[];
}


export default function MoviesBox({ movies = []}: MoviesBoxProps) {
    return (
        <div className=" py-8 w-full  mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

                {movies.map((movie) => (
                    <div key={movie.id} className="group cursor-pointer flex flex-col gap-3">


                        <div className="relative rounded-xl overflow-hidden aspect-2/3 border border-gray-800">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-gray-300 text-[10px] px-2 py-1 rounded-md">
                                {movie.genre}
                            </div>
                        </div>


                        <div className="flex flex-col">
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

                    </div>
                ))}

            </div>
        </div>
    );
}