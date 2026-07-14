import { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import MoviesBox from "../components/MoviesBox";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import type { MovieType, TMDBShow } from "../types";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";

export default function AnimePage() {
    const [animeList, setAnimeList] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAnime = () => {
            setIsLoading(true);
            fetch(apiEndpoints.discoverAnime(currentPage))
                .then((res) => {
                    if (!res.ok) throw new Error("مشکل در ارتباط با سرور");
                    return res.json();
                })
                .then((data) => {
                    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                    const formattedAnime: MovieType[] = data.results.map((show: TMDBShow) => ({
                        id: show.id,
                        title: show.name,
                        image: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : "/placeholder.jpg",
                        genre: "Anime",
                        genre_ids: show.genre_ids,
                        rating: show.vote_average?.toFixed(1) || "N/A",
                        releaseDate: show.first_air_date || "Unknown",
                        description: show.overview || "No description available.",
                    }));
                    setAnimeList(formattedAnime);
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        };
        fetchAnime();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const renderPaginationItem = (current: number, type: string, element: React.ReactNode) => {
        if (type === 'page') {
            return (
                <button className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${currentPage === current
                    ? "bg-[#CC0000] text-white border border-[#CC0000]"
                    : "bg-[#111111] text-gray-400 border border-gray-800 hover:border-gray-500 hover:text-white"
                    }`}>
                    {current}
                </button>
            );
        }
        if (type === 'prev') {
            return (
                <button disabled={currentPage === 1} className="px-3 h-10 flex items-center justify-center bg-[#111111] border border-gray-800 rounded-md text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer">
                    Prev
                </button>
            );
        }
        if (type === 'next') {
            return (
                <button disabled={currentPage === totalPages} className="px-3 h-10 flex items-center justify-center bg-[#111111] border border-gray-800 rounded-md text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer">
                    Next
                </button>
            );
        }
        if (type === 'jump-prev' || type === 'jump-next') {
            return <span className="text-gray-600 flex items-center justify-center h-10 px-2 tracking-widest">...</span>;
        }
        return element;
    };

    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] min-h-screen flex flex-col">
            <Navbar />
            <div className="w-[85%] mx-auto flex flex-col items-center mt-20 flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                    Top Trending <span className="text-[#CC0000]">Anime</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mb-16 leading-relaxed">
                    Dive into the world of Japanese animation. Discover epic adventures, heartwarming stories, and breathtaking visuals.
                </p>
                <div className="w-full">
                    {isLoading ? (
                        <div className="text-center text-red-500 py-20 text-xl animate-pulse">
                            Summoning Anime...
                        </div>
                    ) : animeList.length > 0 ? (
                        <MoviesBox movies={animeList} mediaType="series" />
                    ) : (
                        <div className="text-center text-gray-500 py-20 text-lg">
                            No anime found.
                        </div>
                    )}
                </div>
                {!isLoading && totalPages > 1 && (
                    <Pagination
                        current={currentPage}
                        total={totalPages * 20}
                        pageSize={20}
                        onChange={handlePageChange}
                        itemRender={renderPaginationItem}
                        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-10 md:mt-16 mb-10 list-none p-0 px-2"
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}