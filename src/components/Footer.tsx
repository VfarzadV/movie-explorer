import { Link } from "react-router-dom";
const footerLinks = [
    {
        title: "Home",
        links: [
            { name: "Categories", path: "/" },
            { name: "Devices", path: "/" },
            { name: "Pricing", path: "/" },
            { name: "FAQ", path: "/" }
        ]
    },
    {
        title: "Movies",
        links: [
            { name: "Genres", path: "/movies" },
            { name: "Trending", path: "/movies" },
            { name: "New Release", path: "/movies" },
            { name: "Popular", path: "/movies" }
        ]
    },
    {
        title: "Shows",
        links: [
            { name: "Genres", path: "/shows" },
            { name: "Trending", path: "/shows" },
            { name: "New Release", path: "/shows" },
            { name: "Popular", path: "/shows" }
        ]
    },
    {
        title: "Support",
        links: [
            { name: "Contact Us", path: "/Support" }
        ]
    },
    {
        title: "Subscription",
        links: [
            { name: "Plans", path: "/subscriptions" },
            { name: "Features", path: "/subscriptions" }
        ]
    }
];

export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] pt-16 pb-8 mt-20">
            <div className="w-[85%] mx-auto">
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
                    
                    {footerLinks.map((column, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <h3 className="text-white font-medium text-lg mb-2">
                                {column.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {column.links.map((linkItem, idx) => (
                                    <li key={idx}>
                                        <Link to={linkItem.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                                            {linkItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-medium text-lg mb-2">
                            Connect With Us
                        </h3>
                        <div className="flex gap-3">
                            <button className="bg-[#1A1A1A] p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                                <img src="/telegram_app.svg" alt="Telegram" className="w-5 h-5" />
                            </button>
                            <button className="bg-[#1A1A1A] p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                                <img src="/twitter.svg" alt="X" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                <div className="w-full h-px bg-gray-800 mb-8"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                    <p>@2024, All Rights Reserved</p>
                    
                    <div className="flex items-center gap-6">
                        <Link to="/terms" className="hover:text-white transition-colors">
                            Terms of Use
                        </Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
                
            </div>
        </footer>
    );
}