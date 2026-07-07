import HomeSectionTitle from "./HomeSectionTitle";
import MoviesBox from "./MoviesBox";
import type { MovieType } from "../types";

const topMoviesData: MovieType[] = [
    {
        id: 1,
        title: "Spider-Man: Across The Spider-Verse",
        image: "/public/spiderman.jpg",
        genre: "Fantasy",
        rating: "8.7",
        releaseDate: "June 2, 2023",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
    },
    {
        id: 2,
        title: "Guardians of the Galaxy Vol. 3",
        image: "/public/guardians.jpg",
        genre: "Fantasy",
        rating: "7.9",
        releaseDate: "May 5, 2023",
        description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own."
    },
    {
        id: 3,
        title: "Avatar: The Way of Water",
        image: "/public/avatar.jpg",
        genre: "Fantasy",
        rating: "7.6",
        releaseDate: "December 14, 2022",
        description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns..."
    },
    {
        id: 4,
        title: "Venom: Let There Be Carnage",
        image: "/public/venom.jpg",
        genre: "Fantasy",
        rating: "5.9",
        releaseDate: "October 1, 2021",
        description: "Eddie Brock attempts to reignite his career by interviewing serial killer Cletus Kasady, who becomes the host of the symbiote Carnage."
    }
];
export default function TopRatedMovies() {
    return (
        <div className="flex flex-col  py-20 w-[85%] mx-auto ">
            <HomeSectionTitle title="Star" icon="/public/star.svg" />
            <MoviesBox movies={topMoviesData} />
        </div>
    )
}
