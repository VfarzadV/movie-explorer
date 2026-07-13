import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MoviesBox from "../components/MoviesBox";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";
import { genreMap } from "../services/genres";
import type { MovieType, TMDBMovie } from "../types";
import Pagination from "rc-pagination";

export default function GenreDetailsPage() {
    const { id } = useParams();
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const genreName = id ? genreMap[Number(id)] : "Unknown Genre";

    useEffect(() => {
        if (!id) return;
        const fetchGenreMovies = () => {
            setIsLoading(true);
            fetch(apiEndpoints.discoverMoviesByGenre(id, currentPage))
                .then(res => res.json())
                .then(data => {
                    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                    const formattedMovies: MovieType[] = data.results.map((item: TMDBMovie) => ({
                        id: item.id,
                        title: item.title,
                        image: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "",
                        genre: genreName,
                        genre_ids: item.genre_ids,
                        rating: item.vote_average?.toFixed(1) || "N/A",
                        releaseDate: item.release_date || "Unknown",
                        description: item.overview || "No description available.",
                    }));
                    setMovies(formattedMovies);
                })
                .catch(err => console.error("Error fetching genre movies:", err))
                .finally(() => setIsLoading(false));
        };
        fetchGenreMovies();
    }, [id, genreName, currentPage]);

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
            <div className="w-[85%] mx-auto flex flex-col mt-20 flex-1">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Best of <span className="text-[#CC0000]">{genreName}</span> Movies
                    </h1>
                </div>
                {isLoading ? (
                    <div className="text-center text-red-500 py-20 text-xl animate-pulse">
                        Loading {genreName} movies...
                    </div>
                ) : (
                    <MoviesBox movies={movies} />
                )}
            </div>
            {!isLoading && totalPages > 1 && (
                <Pagination
                    current={currentPage}
                    total={totalPages * 20}
                    pageSize={20}
                    onChange={handlePageChange}
                    itemRender={renderPaginationItem}
                    className="flex items-center justify-center gap-2 mt-16 mb-10 list-none p-0"
                />
            )}
            <Footer />
        </div>
    );
}