import Navbar from '../components/Navbar';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, PlusIcon, PlayIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiEndpoints, BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';
import type { MovieDetails, Genre, CastMember, MovieType } from '../types';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieDetailDescription() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchMovieDetails = () => {
            setIsLoading(true);
            fetch(apiEndpoints.movieDetails(id as string))
                .then((response) => response.json())
                .then((data) => {
                    setMovie(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching movie details:", error);
                    setIsLoading(false);
                });
        };
        fetchMovieDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#111111] text-red-500 text-xl md:text-2xl font-medium animate-pulse">
                Loading Movie Details...
            </div>
        );
    }

    if (!movie || movie.success === false) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#111111] text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">Movie Not Found!</h2>
                <Link to="/" className="text-gray-400 hover:text-white underline">Go back to home</Link>
            </div>
        );
    }

    const genres = movie.genres?.map((g: Genre) => g.name).join(", ") || "Unknown";
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : "Unknown";
    const castNames = movie.credits?.cast?.slice(0, 5).map((c: CastMember) => c.name).join(", ") || "Unknown";
    const backgroundStyle = movie.backdrop_path
        ? { backgroundImage: `url('${BACKDROP_BASE_URL}${movie.backdrop_path}')` }
        : { backgroundColor: '#111111' };

    const handleWatchlist = () => {
        const watchlistItem: MovieType = {
            id: Number(id),
            title: movie.title,
            image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.jpg",
            genre: "Movie",
            rating: movie.vote_average?.toFixed(1) || "N/A",
            releaseDate: movie.release_date || "Unknown",
            description: movie.overview,
            media_type: "movie"
        };
        toggleWatchlist(watchlistItem);
    };

    const inWatchlist = isInWatchlist(Number(id));

    return (
        <div className="w-full min-h-screen md:min-h-150 pb-10 bg-cover bg-top md:bg-center relative transition-all duration-700" style={backgroundStyle}>
            <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/90 md:via-[#0A0A0A]/80 to-black/60 md:to-black/40"></div>
            <div className="relative z-10">
                <Navbar />
                <div className="text-white w-[95%] xl:w-[85%] mx-auto flex flex-col mt-6 md:mt-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 md:gap-2 w-max group bg-transparent border-none cursor-pointer">
                        <ChevronLeftIcon className="bg-[#0F0F0F] p-1.5 md:p-2 rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center group-hover:text-red-500 transition-colors" />
                        <p className="font-medium text-lg md:text-xl group-hover:text-red-500 transition-colors">Back</p>
                    </button>
                </div>
                <div className="w-[95%] xl:w-[85%] mx-auto flex flex-col md:flex-row mt-6 md:mt-10 text-white items-center md:items-start">
                    <img
                        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'}
                        alt={movie.title}
                        className="w-2/3 sm:w-1/2 md:w-1/4 lg:w-1/5 shadow-2xl md:mr-8 rounded-xl overflow-hidden aspect-2/3 object-cover mb-6 md:mb-0 border border-gray-800"
                    />
                    <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 w-full">
                            <div className="flex items-baseline justify-center md:justify-start text-[#D2D2D2] gap-2 md:gap-3 flex-wrap">
                                <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white">{movie.title}</h3>
                                <span className="text-lg md:text-xl">({releaseYear})</span>
                            </div>
                            <div className="flex items-center justify-center gap-1 bg-black/50 px-3 py-1.5 rounded-lg border border-gray-700 shrink-0 w-max mx-auto md:mx-0">
                                <span className="text-sm md:text-base">{movie.vote_count} votes</span>
                                <StarSolid className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 md:mt-8 w-full">
                            <div>
                                <p className="text-[#D2D2D2] text-sm md:text-base mt-2 md:mt-3">
                                    <strong className="text-white font-medium">Genre:</strong> {genres}
                                </p>
                                <p className="text-[#D2D2D2] text-sm md:text-base mt-2 md:mt-3">
                                    <strong className="text-white font-medium">Time:</strong> {movie.runtime}m
                                </p>
                                <p className="text-[#D2D2D2] text-sm md:text-base mt-2 md:mt-3">
                                    <strong className="text-white font-medium">Stars:</strong> {castNames}
                                </p>
                            </div>
                        </div>
                        <div className="text-lg md:text-xl bg-amber-400 py-1 px-3 md:px-4 rounded-xl font-bold text-black w-max flex items-center justify-center mt-6 shadow-lg shadow-amber-400/20 mx-auto md:mx-0">
                            {movie.vote_average?.toFixed(1)} / 10
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-5 md:mt-6 max-w-4xl leading-relaxed">
                            {movie.overview}
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 mt-8 md:mt-10 w-full">
                            <Link to={`/trailer/movie/${id}`} className="bg-[#CC0000] rounded-full flex align-middle items-center justify-center py-2.5 px-5 md:py-3.5 md:px-6 gap-1.5 md:gap-2 text-center shadow-lg shadow-red-600/40 hover:shadow-red-600/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer font-medium text-sm md:text-base">
                                <PlayIcon className="w-5 h-5 md:w-6 md:h-6" /> Watch Now
                            </Link>
                            <button
                                onClick={handleWatchlist}
                                type="button"
                                className={`border rounded-full flex align-middle items-center py-2.5 px-5 md:py-3.5 md:px-6 gap-1.5 md:gap-2 text-center shadow-lg transition-all duration-300 cursor-pointer font-medium text-sm md:text-base ${inWatchlist ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' : 'bg-[#1A1A1A] border-gray-700 text-white hover:bg-gray-800 hover:-translate-y-1'}`}
                            >
                                {inWatchlist ? <CheckIcon className="w-5 h-5 md:w-6 md:h-6" /> : <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />}
                                {inWatchlist ? 'In Watchlist' : 'WatchList'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}