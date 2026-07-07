import { ChevronLeftIcon, ChevronRightIcon, PlusIcon , PlayIcon } from "@heroicons/react/24/outline";
export default function HomeHeaderTitle() {
    return (
        <div className=' w-[85%] flex justify-center items-center mt-150 mx-auto  text-white gap-6'>
            <ChevronLeftIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center  hover:text-red-500 transition-colors" />
            <img src="/public/Vector.jpg" className='rounded-sm' />
            <div>
                <h3 className='font-bold text-5xl flex items-center justify-center mx-auto'>The Crown</h3>
                <p className='text-center text-lg mt-4 flex items-center justify-center mx-auto max-w-6xl'>
                    After the king's sudden death, Elizabeth's seemingly quiet life is rattled with personal trials and tribulations and the affairs of the state as she succeeds to the throne of the British monarchy.
                </p>
                <div className='flex items-center justify-center mx-auto gap-3 mt-8 '>
                    <button className='bg-[#BB0000] rounded-full flex align-middle items-center justify-center py-3.5 px-5 gap-1 text-center'><PlayIcon className='w-7 h-7' /> Watch Now</button>
                    <button className='bg-[#1A1A1A] rounded-full flex align-middle items-center py-3.5 px-5 gap-1.5 text-center'><PlusIcon className='w-7 h-7' /> WatchList</button>
                </div>
            </div>
            <img src="/public/Vector2.jpg" className='rounded-sm' />
            <ChevronRightIcon className="bg-[#0F0F0F] p-1 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center  hover:text-red-500 transition-colors" />
        </div>
    )
}
