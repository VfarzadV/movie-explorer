import type { SectionTitleProps } from "../types";
import { Link } from "react-router-dom";

export default function HomeSectionTitle({ title, icon, path = "/MoviesPage" }: SectionTitleProps): React.JSX.Element {
    return (
        <div className="flex items-center justify-between w-full mb-5">

            <div className="flex items-center gap-3">
                <img src={icon} alt={title} className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>

            <div>
                <Link
                    to={path}
                    className="border-b-2 p-1 border-red-600 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    View All
                </Link>
            </div>

        </div>
    )
}
