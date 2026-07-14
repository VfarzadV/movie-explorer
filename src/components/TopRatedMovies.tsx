import HomeSectionTitle from "./HomeSectionTitle";
import MoviesBox from "./MoviesBox";
import type { MovieType, TMDBMovie } from "../types";
import { useEffect, useState } from "react";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";

export default function TopRatedMovies() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(apiEndpoints.topRated)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("ارتباط با سرور برقرار نشد!");
                }
                return response.json();
            })
            .then((data) => {
                const firstFourMovies = data.results.slice(0, 5);
                const formattedMovies: MovieType[] = firstFourMovies.map((movie: TMDBMovie) => ({
                    id: movie.id,
                    title: movie.title,
                    image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.jpg",
                    genre: "Drama",
                    genre_ids: movie.genre_ids,
                    rating: movie.vote_average.toFixed(1),
                    releaseDate: movie.release_date,
                    description: movie.overview,
                }));
                setMovies(formattedMovies);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col  py-10 w-[85%] mx-auto ">
            <HomeSectionTitle title="Top Rated Movies" icon="/public/star.svg" path="/MoviesPage" />
            {isLoading ? (
                <div className="flex justify-center items-center h-64 text-red-500 text-xl font-medium animate-pulse">
                    Loading blockbuster movies...
                </div>
            ) : (
                <MoviesBox movies={movies} />
            )}
        </div>
    )
}
