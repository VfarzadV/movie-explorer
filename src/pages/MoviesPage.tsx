import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "rc-pagination";
import MoviesBox from "../components/MoviesBox";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import type { MovieType, TMDBMovie } from "../types";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = (url: string) => {
        setIsLoading(true);
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("مشکل در ارتباط با سرور");
                return res.json();
            })
            .then((data) => {
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                const formattedMovies: MovieType[] = data.results.map((movie: TMDBMovie) => ({
                    id: movie.id,
                    title: movie.title,
                    image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "",
                    genre: "Action",
                    genre_ids: movie.genre_ids,
                    rating: movie.vote_average.toFixed(1),
                    releaseDate: movie.release_date || "Unknown",
                    description: movie.overview || "No description available.",
                }));
                setMovies(formattedMovies);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                fetchMovies(apiEndpoints.popular(currentPage));
            } else {
                fetchMovies(apiEndpoints.search(searchQuery, currentPage));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, currentPage]);

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
        setCurrentPage(1);
    };

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
                    Your Gateway to Movie <span className="text-[#CC0000]">Magic</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mb-10 leading-relaxed">
                    Dive into the world of cinema with MovieWatch, where you can search and find everything you want to watch.
                </p>
                <div className="w-full max-w-3xl mb-12 relative group">
                    <div className="flex items-center w-full bg-[#111111] border border-gray-800 rounded-lg overflow-hidden transition-colors focus-within:border-red-600 shadow-lg">
                        <input
                            type="text"
                            placeholder="Search movie you want..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="flex-1 bg-transparent text-white px-6 py-4 focus:outline-none w-full"
                        />
                        <button className="bg-[#CC0000] h-full px-6 py-4 flex items-center justify-center">
                            <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    {isLoading ? (
                        <div className="text-center text-red-500 py-20 text-xl animate-pulse">
                            Searching the database...
                        </div>
                    ) : movies.length > 0 ? (
                        <MoviesBox movies={movies} />
                    ) : (
                        <div className="text-center text-gray-500 py-20 text-lg">
                            No movies found for "{searchQuery}"
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