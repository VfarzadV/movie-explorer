import type { GenreType } from "../types";


const genresData: GenreType[] = [
    { id: 1, title: 'Fantasy', image: '/public/Fantasy.jpg' },
    { id: 2, title: 'Sitcom', image: '/public/Sitcom.jpg' },
    { id: 3, title: 'Drama', image: '/public/Drama.jpg' },
    { id: 4, title: 'Romance', image: '/public/Romance.jpg' },
];
export default function GenresBox() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

            {genresData.map((genre) => (
                <div
                    key={genre.id}
                    className="group relative h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-gray-500 transition-colors"
                >

                    <img
                        src={genre.image}
                        alt={genre.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-white text-xl font-medium tracking-wide">
                            {genre.title}
                        </h3>
                    </div>

                </div>
            ))}

        </div>
    )
}
