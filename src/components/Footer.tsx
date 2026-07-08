const footerLinks = [
    {
        title: "Home",
        links: ["Categories", "Devices", "Pricing", "FAQ"]
    },
    {
        title: "Movies",
        links: ["Genres", "Trending", "New Release", "Popular"]
    },
    {
        title: "Shows",
        links: ["Genres", "Trending", "New Release", "Popular"]
    },
    {
        title: "Support",
        links: ["Contact Us"]
    },
    {
        title: "Subscription",
        links: ["Plans", "Features"]
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
                                {column.links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                            {link}
                                        </a>
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
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}