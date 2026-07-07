import HomeSectionTitle from "./HomeSectionTitle";
import MoviesBox from "./MoviesBox";
import type { MovieType } from "../types";


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
    console.log("Data in Suggest component:", suggestedData);
    return (
        <div className="flex flex-col  py-20 w-[85%] mx-auto ">
            <HomeSectionTitle title="Maybe You Like This" icon="/public/like.svg" />
            <MoviesBox movies={suggestedData} />
        </div>
    )
}
