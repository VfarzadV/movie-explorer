import type { SectionTitleProps } from "../types";
import { Link } from "react-router-dom";

export default function HomeSectionTitle({ title, icon, path = "/MoviesPage" }: SectionTitleProps): React.JSX.Element {
    return (
        <div className="flex items-center justify-between w-full mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
                <img src={icon} alt={title} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </div>
            <div>
                <Link
                    to={path}
                    className="border-b-2 p-1 border-red-600 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm md:text-base font-medium whitespace-nowrap shrink-0"
                >
                    View All
                </Link>
            </div>
        </div>
    )
}