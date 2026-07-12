import Navbar from '../components/Navbar';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, PlusIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiEndpoints, BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';
import type { MovieDetails, Genre, CastMember } from '../types';

export default function MovieDetailDescription() {

    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            <div className="w-full h-screen flex items-center justify-center bg-[#111111] text-red-500 text-2xl font-medium animate-pulse">
                Loading Movie Details...
            </div>
        );
    }
    if (!movie || movie.success === false) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#111111] text-white">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Movie Not Found!</h2>
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
    return (
        <div className="w-full min-h-[600px] pb-10 bg-cover bg-center relative transition-all duration-700" style={backgroundStyle}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-black/40"></div>
            <div className="relative z-10">
                <Navbar />
                <div className='text-white w-[85%] mx-auto flex flex-col mt-10'>
                    <Link to="/" className='flex items-center gap-2 w-max group'>
                        <ChevronLeftIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center group-hover:text-red-500 transition-colors" />
                        <p className='font-medium text-xl group-hover:text-red-500 transition-colors'>Back home</p>
                    </Link>
                </div>
                <div className='w-[85%] mx-auto flex flex-col md:flex-row mt-10 text-white items-start md:items-center'>
                    <img
                        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'}
                        alt={movie.title}
                        className='w-full md:w-1/4 lg:w-1/5 shadow-2xl mr-8 rounded-xl overflow-hidden aspect-2/3 object-cover mb-8 md:mb-0 border border-gray-800'
                    />
                    <div className='w-full md:w-3/4 lg:w-4/5'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                            <div className='flex items-baseline text-[#D2D2D2] gap-3'>
                                <h3 className='font-bold text-4xl md:text-5xl text-white'>{movie.title}</h3>
                                <span className="text-xl">({releaseYear})</span>
                            </div>
                            <div className='flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-lg border border-gray-700'>
                                <span>{movie.vote_count} votes</span>
                                <StarSolid className="w-5 h-5 text-yellow-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8">
                            <div>
                                <p className='text-[#D2D2D2] text-base mt-3'>
                                    <strong className="text-white font-medium">Genre:</strong> {genres}
                                </p>
                                <p className='text-[#D2D2D2] text-base mt-3'>
                                    <strong className="text-white font-medium">Time:</strong> {movie.runtime}m
                                </p>
                                <p className='text-[#D2D2D2] text-base mt-3'>
                                    <strong className="text-white font-medium">Stars:</strong> {castNames}
                                </p>
                            </div>
                        </div>
                        <div className='text-xl bg-amber-400 py-1 px-4 rounded-xl font-bold text-black w-max flex items-center justify-center mt-6 shadow-lg shadow-amber-400/20'>
                            {movie.vote_average?.toFixed(1)} / 10
                        </div>
                        <p className='text-gray-300 text-lg mt-6 max-w-4xl leading-relaxed'>
                            {movie.overview}
                        </p>
                        <div className='flex flex-wrap items-center gap-4 mt-10'>
                            <button type='button' className='bg-[#CC0000] rounded-full flex align-middle items-center justify-center py-3.5 px-6 gap-2 text-center shadow-lg shadow-red-600/40 hover:shadow-red-600/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer font-medium'>
                                <PlayIcon className='w-6 h-6' /> Watch Now
                            </button>
                            <button type="button" className='bg-[#1A1A1A] border border-gray-700 rounded-full flex align-middle items-center py-3.5 px-6 gap-2 text-center shadow-lg hover:bg-gray-800 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer font-medium'>
                                <PlusIcon className='w-6 h-6' /> WatchList
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
