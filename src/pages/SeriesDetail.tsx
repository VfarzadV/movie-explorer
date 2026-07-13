import { useEffect, useState } from 'react';
import { useParams , useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Comments from "../components/Comments";
import RelatedMovies from "../components/RelatedMovies";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { apiEndpoints, BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';
import type { TMDBTvDetails } from "../types";

export default function SeriesDetail() {
    const { id } = useParams();
    const [show, setShow] = useState<TMDBTvDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const fetchSeriesData = () => {
            setIsLoading(true);
            fetch(apiEndpoints.SeriesDetails(id as string))
                .then(res => res.json())
                .then(data => {
                    setShow(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                });
        };
        fetchSeriesData();
    }, [id]);

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#111111] text-red-500 text-2xl animate-pulse">Loading TV Show...</div>;
    }
    if (!show || show.success === false) {
        return <div className="w-full h-screen flex flex-col items-center justify-center bg-[#111111] text-white"><h2>Show Not Found!</h2></div>;
    }
    const genres = show.genres?.map(g => g.name).join(", ") || "Unknown";
    const releaseYear = show.first_air_date ? show.first_air_date.split('-')[0] : "Unknown";
    const castNames = show.credits?.cast?.slice(0, 5).map(c => c.name).join(", ") || "Unknown";
    const backgroundStyle = show.backdrop_path
        ? { backgroundImage: `url('${BACKDROP_BASE_URL}${show.backdrop_path}')` }
        : { backgroundColor: '#111111' };

    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A]">
            <div className="w-full min-h-150 pb-10 bg-cover bg-center relative transition-all duration-700" style={backgroundStyle}>
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-black/40"></div>
                <div className="relative z-10">
                    <Navbar />
                    <div className='text-white w-[85%] mx-auto flex flex-col mt-10'>
                        <button onClick={() => navigate(-1)} className='flex items-center gap-2 w-max group bg-transparent border-none cursor-pointer'>
                            <ChevronLeftIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 flex items-center justify-center group-hover:text-red-500 transition-colors" />
                            <p className='font-medium text-xl group-hover:text-red-500 transition-colors'>Back</p>
                        </button>
                    </div>
                    <div className='w-[85%] mx-auto flex flex-col md:flex-row mt-10 text-white items-start md:items-center'>
                        <img
                            src={show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : ''}
                            alt={show.name}
                            className='w-full md:w-1/4 lg:w-1/5 shadow-2xl mr-8 rounded-xl overflow-hidden aspect-2/3 object-cover mb-8 md:mb-0 border border-gray-800'
                        />
                        <div className='w-full md:w-3/4 lg:w-4/5'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                                <div className='flex items-baseline text-[#D2D2D2] gap-3'>

                                    <h3 className='font-bold text-4xl md:text-5xl text-white'>{show.name}</h3>
                                    <span className="text-xl">({releaseYear})</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8">
                                <div>
                                    <p className='text-[#D2D2D2] text-base mt-3'><strong className="text-white font-medium">Genre:</strong> {genres}</p>
                                    <p className='text-[#D2D2D2] text-base mt-3'><strong className="text-white font-medium">Seasons:</strong> {show.number_of_seasons}</p>
                                    <p className='text-[#D2D2D2] text-base mt-3'><strong className="text-white font-medium">Stars:</strong> {castNames}</p>
                                </div>
                            </div>
                            <div className='text-xl bg-amber-400 py-1 px-4 rounded-xl font-bold text-black w-max flex items-center justify-center mt-6'>
                                {show.vote_average?.toFixed(1)} / 10
                            </div>
                            <p className='text-gray-300 text-lg mt-6 max-w-4xl leading-relaxed'>
                                {show.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Comments />
            <RelatedMovies id={id as string} mediaType="series" />
            <Footer />
        </div>
    )
}