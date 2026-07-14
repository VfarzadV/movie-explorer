import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PlusIcon, PlayIcon, CheckIcon } from "@heroicons/react/24/solid";
import type { HomeHeaderTitleProps, MovieType } from "../types";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { IMAGE_BASE_URL } from "../services/tmdb";

export default function HomeHeaderTitle({ movie, id, title, overview, onNext, onPrev, prevImage, nextImage }: HomeHeaderTitleProps) {
    const { toggleWatchlist, isInWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(id);

    const handleWatchlist = () => {
        const watchlistItem: MovieType = {
            id: movie.id,
            title: movie.title,
            image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.jpg",
            genre: "Trending",
            rating: movie.vote_average?.toFixed(1) || "N/A",
            releaseDate: movie.release_date || "Unknown",
            description: movie.overview,
            media_type: "movie"
        };
        toggleWatchlist(watchlistItem);
    };

    return (
        <div className='w-[85%]  flex justify-center items-center mt-40 sm:mt-52 md:mt-66 lg:mt-90 mx-auto text-white gap-2 sm:gap-4 md:gap-6'>
            <button onClick={onPrev} className="focus:outline-none shrink-0 z-20">
                <ChevronLeftIcon className="bg-[#0F0F0F] p-1.5 md:p-2 rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer flex items-center justify-center hover:text-red-500 hover:scale-110 active:scale-95 transition-all" />
            </button>
            {prevImage && (
                <div
                    onClick={onPrev}
                    className="hidden lg:block relative group cursor-pointer w-20 xl:w-32 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-gray-400 hover:-translate-y-2 transition-all duration-300 shrink-0"
                >
                    <img src={prevImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" alt="Previous Movie" />
                </div>
            )}
            <div className="flex flex-col items-center max-w-4xl px-2">
                <h3 className='font-bold text-3xl sm:text-4xl md:text-5xl text-center line-clamp-2'>{title}</h3>
                <p className='text-center text-gray-300 text-sm sm:text-base md:text-lg mt-3 md:mt-4 line-clamp-3 md:line-clamp-4 leading-relaxed'>
                    {overview}
                </p>
                <div className='flex flex-wrap items-center justify-center mx-auto gap-3 md:gap-4 mt-6 md:mt-8'>
                    <Link to={`/movie/${id}`} className='bg-[#BB0000] rounded-full flex align-middle items-center justify-center py-2.5 px-4 md:py-3.5 md:px-6 gap-1 md:gap-2 text-center shadow-lg shadow-black/40 hover:shadow-black/70 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer text-sm md:text-base'>
                        <PlayIcon className='w-5 h-5 md:w-6 md:h-6' /> Watch Now
                    </Link>
                    <button
                        onClick={handleWatchlist}
                        type="button"
                        className={`border rounded-full flex align-middle items-center py-2.5 px-4 md:py-3.5 md:px-6 gap-1 md:gap-2 text-center shadow-lg transition-all duration-300 cursor-pointer font-medium text-sm md:text-base ${inWatchlist ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' : 'bg-[#1A1A1A] border-transparent text-white hover:bg-gray-800 hover:-translate-y-1'}`}
                    >
                        {inWatchlist ? <CheckIcon className='w-5 h-5 md:w-6 md:h-6' /> : <PlusIcon className='w-5 h-5 md:w-6 md:h-6' />}
                        {inWatchlist ? 'In Watchlist' : 'WatchList'}
                    </button>
                </div>
            </div>
            {nextImage && (
                <div
                    onClick={onNext}
                    className="hidden lg:block relative group cursor-pointer w-20 xl:w-32 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-gray-400 hover:-translate-y-2 transition-all duration-300 shrink-0"
                >
                    <img src={nextImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" alt="Next Movie" />
                </div>
            )}
            <button onClick={onNext} className="focus:outline-none shrink-0 z-20">
                <ChevronRightIcon className="bg-[#0F0F0F] p-1.5 md:p-2 rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer flex items-center justify-center hover:text-red-500 hover:scale-110 active:scale-95 transition-all" />
            </button>
        </div>
    )
}