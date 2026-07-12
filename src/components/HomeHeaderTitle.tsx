import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PlayIcon } from "@heroicons/react/24/outline";
import type { HomeHeaderTitleProps } from "../types";
import { Link } from "react-router-dom";
export default function HomeHeaderTitle({id, title, overview, onNext, onPrev, prevImage, nextImage }: HomeHeaderTitleProps) {
    return (
        <div className=' w-[85%] flex justify-center items-center mt-130 mx-auto text-white gap-6'>
            <button onClick={onPrev} className="focus:outline-none shrink-0 z-20">
                <ChevronLeftIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center hover:text-red-500 hover:scale-110 active:scale-95 transition-all" />
            </button>
            {prevImage && (
                <div
                    onClick={onPrev}
                    className="hidden lg:block relative group cursor-pointer w-24 xl:w-32 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-gray-400 hover:-translate-y-2 transition-all duration-300"
                >
                    <img src={prevImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" alt="Previous Movie" />
                </div>
            )}
            <div className="flex flex-col items-center max-w-4xl">
                <h3 className='font-bold text-4xl md:text-5xl text-center'>{title}</h3>
                <p className='text-center text-gray-300 text-lg mt-4 line-clamp-3 leading-relaxed'>
                    {overview}
                </p>
                <div className='flex items-center justify-center mx-auto gap-3 mt-8'>
                    <Link to={`/movie/${id}`} className='bg-[#BB0000] rounded-full flex align-middle items-center justify-center py-3.5 px-5 gap-1 text-center shadow-lg shadow-black/40 hover:shadow-black/70 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer'>
                        <PlayIcon className='w-7 h-7' /> Watch Now
                    </Link>
                    <button type="button" className='bg-[#1A1A1A] rounded-full flex align-middle items-center py-3.5 px-5 gap-1.5 text-center shadow-lg shadow-red-600/30 hover:shadow-red-600/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer'>
                        <PlusIcon className='w-7 h-7' /> WatchList
                    </button>
                </div>
            </div>
            {nextImage && (
                <div
                    onClick={onNext}
                    className="hidden lg:block relative group cursor-pointer w-24 xl:w-32 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-gray-400 hover:-translate-y-2 transition-all duration-300"
                >
                    <img src={nextImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" alt="Next Movie" />
                </div>
            )}
            <button onClick={onNext} className="focus:outline-none shrink-0 z-20">
                <ChevronRightIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center hover:text-red-500 hover:scale-110 active:scale-95 transition-all" />
            </button>
        </div>
    )
}
