import { useEffect, useState } from "react";
import { ChevronDownIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { apiEndpoints, IMAGE_BASE_URL } from "../services/tmdb";
import type { TMDBReview, UnifiedReview } from "../types";
interface CommentsSectionProps {
    mediaType: "movie" | "series";
    id: string | number;
}
export default function CommentsSection({ mediaType, id }: CommentsSectionProps) {
    const [reviews, setReviews] = useState<UnifiedReview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        if (!id) return;
        const loadData = () => {
            setIsLoading(true);
            const url = mediaType === "movie"
                ? apiEndpoints.movieReviews(id)
                : apiEndpoints.seriesReviews(id);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const fetchedReviews: UnifiedReview[] = (data.results || []).map((r: TMDBReview) => {
                        const starRating = r.author_details?.rating ? Math.round(r.author_details.rating / 2) : 0;
                        let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author)}&background=222222&color=ffffff&size=128`;

                        if (r.author_details?.avatar_path) {
                            if (r.author_details.avatar_path.startsWith("/http")) {
                                avatarUrl = r.author_details.avatar_path.substring(1);
                            } else {
                                avatarUrl = `${IMAGE_BASE_URL}${r.author_details.avatar_path}`;
                            }
                        }

                        return {
                            id: r.id,
                            name: r.author,
                            text: r.content,
                            date: new Intl.DateTimeFormat("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }).format(new Date(r.created_at)),
                            rating: starRating,
                            avatar: avatarUrl
                        };
                    });
                    setReviews(fetchedReviews);
                })
                .catch(err => console.error("Error fetching reviews:", err))
                .finally(() => setIsLoading(false));
        };

        loadData();
    }, [id, mediaType]);

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rating === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a star rating first!",
                background: "#111111",
                color: "#ffffff",
                confirmButtonColor: "#CC0000",
            });
            return;
        }

        const today = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }).format(new Date());

        const newReviewObj: UnifiedReview = {
            id: Date.now(),
            name: "Farzad Vatandoust",
            text: newComment,
            date: today,
            rating: rating,
            avatar: "https://www.gravatar.com/avatar/?d=mp"
        };

        setReviews([newReviewObj, ...reviews]);

        await Swal.fire({
            title: "Review Submitted!",
            text: "Thank you for sharing your thoughts.",
            icon: "success",
            background: "#111111",
            color: "#ffffff",
            confirmButtonColor: "#CC0000",
            timer: 2500,
            backdrop: true,
        });

        setNewComment("");
        setRating(0);
    };

    return (
        <div className="flex flex-col gap-6 w-[85%] mx-auto mt-12 border-t border-[#222222] pt-10">
            <div className="flex items-center justify-between bg-linear-to-r from-[#1A1A1A] to-[#111111] px-6 py-4 rounded-xl border border-[#2A2A2A] text-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="bg-[#CC0000]/20 p-2 rounded-lg">
                        <img className="w-6 h-6 opacity-80" src="/messages.svg" alt="messages" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-wide">Comments</h3>
                    <span className="bg-[#222] text-[#AAA] text-xs px-2.5 py-1 rounded-full ml-2">{reviews.length}</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors bg-[#222] px-4 py-2 rounded-lg text-sm font-medium">
                    <span>Latest</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            </div>
            <div className="flex flex-col py-8 mx-auto w-full">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#111] border border-[#222] rounded-2xl shadow-inner">
                        <StarOutline className="w-16 h-16 text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                            {reviews.slice(0, visibleCount).map((review) => (
                                <div key={review.id} className="bg-linear-to-br from-[#151515] to-[#0A0A0A] border border-[#222222] p-7 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-red-900/10 hover:border-[#333] transition-all duration-300 group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#222] group-hover:ring-red-900/50 transition-all">
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=222222&color=ffffff&size=128`;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-gray-100 text-base font-semibold tracking-wide">
                                                    {review.name}
                                                </h4>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        i < review.rating ?
                                                            <StarSolid key={i} className="w-3.5 h-3.5 text-yellow-500" /> :
                                                            <StarOutline key={i} className="w-3.5 h-3.5 text-gray-600" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1">
                                            <EllipsisHorizontalIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mt-2 font-light">
                                        {review.text}
                                    </p>
                                    <p className="text-gray-600 text-xs mt-auto pt-4 border-t border-[#222]/50">
                                        Posted on {review.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {visibleCount < reviews.length && (
                            <button
                                onClick={() => setVisibleCount(prev => prev + 4)}
                                className="mx-auto mt-10 bg-transparent border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-medium px-8 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-600/20"
                            >
                                Load More Comments
                            </button>
                        )}
                    </>
                )}
                <div className="bg-linear-to-b from-[#111111] to-[#0A0A0A] border border-[#222222] p-8 md:p-10 rounded-2xl mt-14 shadow-2xl w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-800 via-red-600 to-red-900"></div>
                    <h3 className="text-2xl font-bold text-white mb-8">Leave a Review</h3>
                    <form onSubmit={handleAddComment} className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-xl border border-[#222] w-fit">
                            <span className="text-gray-300 text-sm font-medium">Your Rating:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <button
                                        type="button"
                                        key={starIndex}
                                        onClick={() => setRating(starIndex)}
                                        onMouseEnter={() => setHoverRating(starIndex)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                                    >
                                        {starIndex <= (hoverRating || rating) ? (
                                            <StarSolid className="w-7 h-7 text-yellow-500 drop-shadow-md" />
                                        ) : (
                                            <StarOutline className="w-7 h-7 text-gray-600 hover:text-gray-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            rows={4}
                            placeholder="What are your thoughts on this?"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-[#151515] border border-[#2A2A2A] rounded-xl p-5 text-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all resize-none font-light placeholder-gray-600"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            disabled={newComment.trim().length < 5}
                            className="self-end px-10 py-3.5 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 bg-linear-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 hover:shadow-red-600/30 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Post Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}