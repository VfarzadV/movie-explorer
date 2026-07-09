import { ChevronDownIcon, StarIcon as StarOutline, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";



const initialReviews = [
    {
        id: 1,
        name: "Samantha D.",
        text: "\"The Crown\" is seriously addictive! The drama, the history, the scandals—it's all so captivating. And the cast? Absolutely brilliant! Can't get enough of this royal rollercoaster!",
        date: "August 14, 2023",
        rating: 5
    },
    {
        id: 2,
        name: "Jenny Wilson",
        text: "\"OMG, just binged \"The Crown\" and I'm obsessed! The drama, the history, the cast - it's like a royal rollercoaster that I can't get enough of. 10/10 would recommend for anyone looking for their next binge-worthy show!\"",
        date: "August 12, 2023",
        rating: 5
    },
    {
        id: 3,
        name: "Leslie Alexander",
        text: "\"The Crown\" is an absolute binge-worthy masterpiece! It flawlessly combines history with drama, keeping viewers hooked with its gripping storytelling and stellar performances. A must-watch for anyone fascinated by the intricacies of royal life.",
        date: "August 14, 2023",
        rating: 5
    },
    {
        id: 4,
        name: "Jenny Wilson",
        text: "\"OMG, just binged \"The Crown\" and I'm obsessed! The drama, the history, the cast - it's like a royal rollercoaster that I can't get enough of. 10/10 would recommend for anyone looking for their next binge-worthy show!\"",
        date: "August 12, 2023",
        rating: 4
    }
];

export default function Comments() {
    const [reviews, setReviews] = useState(initialReviews);

    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0); 
    const [hoverRating, setHoverRating] = useState(0); 

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

        const newReviewObj = {
            id: Date.now(),
            name: "Current User",
            text: newComment,
            date: today,
            rating: rating
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
        <div className="flex flex-col gap-4 w-[85%] mx-auto mt-8">
            <div className="flex items-center justify-between bg-[#1A1A1A] px-6 py-3 rounded-lg border-2 border-[#1F1F1F] text-white mt-6">
                <div className="flex items-center gap-2.5 justify-center">
                    <img className="w-8 h-8" src="/messages.svg" />
                    <h3>Comments</h3>
                    <p className="text-[#D2D2D2] ">28 comments</p>
                </div>
                <div className="flex items-center gap-2.5 justify-center cursor-pointer hover:text-red-500 transition-colors">
                    <p>
                        Latest
                    </p>
                    <ChevronDownIcon className="w-6 h-6 " />
                </div>
            </div>
            <div className="flex flex-col py-16 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-[#111111] border border-[#222222] p-8 rounded-2xl flex flex-col gap-5">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        i < review.rating ?
                                            <StarSolid key={i} className="w-5 h-5 text-yellow-500" /> :
                                            <StarOutline key={i} className="w-5 h-5 text-gray-600" />
                                    ))}
                                </div>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <EllipsisHorizontalIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <h4 className="text-white text-lg font-medium tracking-wide">
                                {review.name}
                            </h4>
                            <p className="text-gray-400 text-[15px] leading-relaxed">
                                {review.text}
                            </p>
                            <p className="text-gray-500 text-sm mt-auto pt-4">
                                Posted on {review.date}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="mx-auto mt-12 bg-[#CC0000] hover:bg-red-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors">
                    See more
                </button>

                <div className="bg-[#0A0A0A] border border-[#222222] p-8 rounded-2xl mt-12 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-6">Leave a Review</h3>
                    <form onSubmit={handleAddComment} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-400 text-sm mr-2">Your Rating:</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <button
                                        type="button"
                                        key={starIndex}
                                        onClick={() => setRating(starIndex)}
                                        onMouseEnter={() => setHoverRating(starIndex)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        {starIndex <= (hoverRating || rating) ? (
                                            <StarSolid className="w-7 h-7 text-yellow-500" />
                                        ) : (
                                            <StarOutline className="w-7 h-7 text-gray-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="What did you think about this movie?"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-[#111111] border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            disabled={newComment.trim().length < 5}
                            className="self-end px-8 py-3 mt-2 text-white font-medium rounded-lg shadow-md transition-all duration-300 bg-red-600 hover:bg-red-700 hover:shadow-red-600/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Post Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
