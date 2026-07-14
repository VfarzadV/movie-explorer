import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { apiEndpoints } from "../services/tmdb";
import type { TMDBVideo } from "../types";

export default function TrailerPage() {
    const { mediaType, id } = useParams();
    const navigate = useNavigate();
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id || !mediaType) return;
        const fetchVideos = () => {
            setIsLoading(true);
            const url = mediaType === "movie"
                ? apiEndpoints.movieVideos(id)
                : apiEndpoints.seriesVideos(id);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const trailer = data.results?.find(
                        (vid: TMDBVideo) => vid.site === "YouTube" && vid.type === "Trailer"
                    );
                    const videoToPlay = trailer || data.results?.find((vid: TMDBVideo) => vid.site === "YouTube");
                    if (videoToPlay) {
                        setTrailerKey(videoToPlay.key);
                    }
                })
                .catch(err => console.error("Error fetching trailer:", err))
                .finally(() => setIsLoading(false));
        };
        fetchVideos();
    }, [id, mediaType]);

    return (
        <div className="w-screen h-screen bg-black flex flex-col relative overflow-hidden text-white">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 right-8 z-50 bg-black/50 hover:bg-red-600 p-3 rounded-full transition-colors cursor-pointer group"
            >
                <XMarkIcon className="w-8 h-8 text-gray-300 group-hover:text-white" />
            </button>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-red-500 text-2xl animate-pulse">
                    Loading Cinema Mode...
                </div>
            ) : trailerKey ? (
                <>
                    <iframe
                        className="w-full h-full z-10"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&rel=0&showinfo=0&modestbranding=1`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <a
                        href={`https://www.youtube.com/watch?v=${trailerKey}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#CC0000] hover:bg-red-700 px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-red-600/40"
                    >
                        Watch directly on YouTube
                    </a>
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-500">Sorry, no trailer available!</h2>
                    <button onClick={() => navigate(-1)} className="text-red-500 hover:underline text-lg">
                        Go back
                    </button>
                </div>
            )}
        </div>
    );
}