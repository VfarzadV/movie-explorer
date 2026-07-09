import Navbar from '../components/Navbar';
import { ChevronLeftIcon, StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, PlusIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function MovieDetailDescription() {
    return (
        <div className="w-full h-275 bg-[url('/public/Picture.jpg')] bg-cover bg-center relative">
            <Navbar />
            <div className='text-white w-[85%] mx-auto flex flex-col mt-15'>
                <Link to="/" className='flex items-center gap-2'>
                    <ChevronLeftIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center  hover:text-red-500 transition-colors" />
                    <p className='font-medium text-2xl'>Back home</p>
                </Link>
            </div>
            <div className='w-[85%] mx-auto flex  mt-10 text-white items-center'>
                <img src="/The-Crown.jpg" alt="The Crown" className='w-1/5 shadow-lg mr-6 rounded-xl overflow-hidden aspect-2/3' />
                <div className='w-4/5'>
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex items-center justify-center text-[#D2D2D2] gap-1'>
                            <h3 className='font-bold text-5xl'>The Crown</h3>
                            <span>2016-2023</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <span>28 comments</span>
                            <StarSolid className="w-6 h-6 text-yellow-500" />
                            <StarSolid className="w-6 h-6 text-yellow-500" />
                            <StarSolid className="w-6 h-6 text-yellow-500" />
                            <StarSolid className="w-6 h-6 text-yellow-500" />
                            <StarOutline className="w-6 h-6 text-yellow-500" />
                        </div>
                    </div>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>Genre: Historical drama</p>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>Time: 58m</p>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>Stars: Claire Foy, Olivia Colman, Matt Smith, Tobias Menzies</p>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>Created by: Peter Morgan</p>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>Network: Netflix</p>
                    <p className=' text-2xl bg-amber-300 py-1 px-0.5 rounded-2xl font-bold  text-black w-16 items-center flex justify-center mt-4'>8.6</p>
                    <p className='text-[#D2D2D2] text-lg mt-4 max-w-6xl'>After the king's sudden death, Elizabeth's seemingly quiet life is rattled with personal trials and tribulations and the affairs of the state as she succeeds to the throne of the British monarchy.</p>
                    <div className='flex items-center  gap-3 mt-16 '>
                        <button type='button' className='bg-[#BB0000] rounded-full flex align-middle items-center justify-center py-3.5 px-5 gap-1 text-center shadow-lg shadow-black/40 hover:shadow-black/70 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer'><PlayIcon className='w-7 h-7' /> Watch Now</button>
                        <button type="button" className='bg-[#1A1A1A] rounded-full flex align-middle items-center py-3.5 px-5 gap-1.5 text-center shadow-lg shadow-red-600/30 hover:shadow-red-600/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer'><PlusIcon className='w-7 h-7' /> WatchList</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
