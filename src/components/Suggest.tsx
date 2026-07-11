import HomeSectionTitle from "./HomeSectionTitle";
import MoviesBox from "./MoviesBox";
import type { MovieType, TMDBMovie } from "../types";
import { useEffect, useState } from "react";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";
const suggestedData: MovieType[] = [
  {
    id: 101,
    title: "Chernobyl disaster",
    image: "/chernobyl.jpg",
    genre: "Documentary • Horror • Tragedy",
    rating: "9.3",
    releaseDate: "April 26, 1986",
    description: "The Chernobyl disaster began on 26 April 1986 with the explosion of the No. 4 reactor of..."
  },
  {
    id: 102,
    title: "Loki",
    image: "/loki.jpg",
    genre: "Action • Fantasy",
    rating: "8.2",
    releaseDate: "June 9, 2021 • Season 2",
    description: "After stealing the Tesseract, Loki comes into contact with a mysterious organization that..."
  },
  {
    id: 103,
    title: "Gen V",
    image: "/gen-v.jpg",
    genre: "Action • Superhero • Fantasy",
    rating: "7.9",
    releaseDate: "Sep 29, 2023 • Season 1",
    description: "The lives of hormonal, competitive Superheroes as they put their physical, sexual, and moral..."
  },
  {
    id: 104,
    title: "Rick and Morty",
    image: "/rick-and-morty.jpg",
    genre: "Sitcom",
    rating: "9.5",
    releaseDate: "December 2, 2013 • Season 7",
    description: "Rick, an alcoholic sociopath and scientist, lives with his daughter Beth's family, apart from building..."
  }
];

export default function Suggest() {

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(apiEndpoints.popular(1))
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


  console.log("Data in Suggest component:", suggestedData);
  return (
    <div className="flex flex-col  py-20 w-[85%] mx-auto ">
      <HomeSectionTitle title="popular Movies" icon="/public/like.svg" />
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
