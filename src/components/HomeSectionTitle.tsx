import type { SectionTitleProps } from "../types";


export default function HomeSectionTitle({ title, icon }: SectionTitleProps): React.JSX.Element {
    return (
        <div className="flex items-center justify-between w-full mb-6">
            
            <div className="flex items-center gap-3">
                <img src={icon} alt={title} className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            
            <div>
                <button 
                  type="button" 
                  className="border-b-2 p-1 border-red-600 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  View All
                </button>
            </div>
            
        </div>
    )
}
