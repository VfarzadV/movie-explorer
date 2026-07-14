import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import MoviesBox from "../components/MoviesBox";
import { useWatchlist } from "../context/WatchlistContext";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function WatchlistPage() {
    const { watchlist } = useWatchlist();

    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] min-h-screen flex flex-col">
            <Navbar />
            <div className="w-[85%] mx-auto flex flex-col mt-20 flex-1">
                <div className="flex items-center gap-4 mb-12 border-b border-[#222] pb-6">
                    <div className="bg-[#CC0000]/20 p-3 rounded-xl">
                        <BookmarkIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            My <span className="text-[#CC0000]">Watchlist</span>
                        </h1>
                        <p className="text-gray-400">Your personal collection of movies and TV shows.</p>
                    </div>
                </div>
                {watchlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#111] border border-[#222] rounded-2xl">
                        <BookmarkIcon className="w-16 h-16 text-gray-600 mb-4" />
                        <h3 className="text-xl text-white font-medium mb-2">Your Watchlist is Empty</h3>
                        <p className="text-gray-500">Explore movies and series and add them to your list!</p>
                    </div>
                ) : (
                    <MoviesBox movies={watchlist} />
                )}
            </div>
            <Footer />
        </div>
    );
}