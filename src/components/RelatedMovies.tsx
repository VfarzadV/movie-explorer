import { useEffect, useState } from "react";
import HomeSectionTitle from "./HomeSectionTitle";
import MoviesBox from "./MoviesBox";
import type { MovieType, RelatedProps, TMDBMovie, TMDBShow } from "../types";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";

export default function RelatedMovies({ id, mediaType = "movie" }: RelatedProps) {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchRelated = () => {
            setIsLoading(true);
            const url = mediaType === "movie"
                ? apiEndpoints.similarMovies(id)
                : apiEndpoints.similarSeries(id);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const topFive = data.results.slice(0, 5);
                    const formattedData: MovieType[] = topFive.map((item: TMDBMovie & TMDBShow) => ({
                        id: item.id,
                        title: item.title || item.name,
                        image: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/",
                        genre: mediaType === "movie" ? "Movie" : "TV Show",
                        genre_ids: item.genre_ids,
                        rating: item.vote_average?.toFixed(1) || "N/A",
                        releaseDate: item.release_date || item.first_air_date || "Unknown",
                        description: item.overview || "No description available.",
                    }));
                    setMovies(formattedData);
                })
                .catch(err => console.error("Error fetching related:", err))
                .finally(() => setIsLoading(false));
        };

        fetchRelated();
    }, [id, mediaType]);

    if (!isLoading && movies.length === 0) return null;

    return (
        <div className="flex flex-col py-10 w-[85%] mx-auto">
            <HomeSectionTitle
                title={mediaType === "movie" ? "Related Movies" : "Related Shows"}
                icon="/video-horizontal.svg"
                path={mediaType === "movie" ? "/MoviesPage" : "/series"}
            />

            {isLoading ? (
                <div className="flex justify-center items-center h-64 text-red-500 text-xl font-medium animate-pulse">
                    Finding recommendations...
                </div>
            ) : (
                <MoviesBox movies={movies} mediaType={mediaType} /> 
            )}
        </div>
    );
}