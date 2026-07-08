const membershipPlans = [
    {
        id: 1,
        name: "Basic Plan",
        price: "9.99",
        features: [
            "Regular content updates.",
            "Unlimited streaming on one device at a time.",
            "Standard definition (SD) video quality.",
            "Access to a vast library of movies from various genres.",
            "Option to create a personalized watchlist."
        ]
    },
    {
        id: 2,
        name: "Standard Plan",
        price: "14.99",
        features: [
            "All features of the Basic Plan.",
            "HD (High Definition) video quality.",
            "Simultaneous streaming on up to two devices.",
            "Ad-free viewing experience.",
            "Offline downloads on mobile devices for selected titles."
        ]
    },
    {
        id: 3,
        name: "Premium Plan",
        price: "19.99",
        features: [
            "All features of the Standard Plan.",
            "Ultra HD (4K) video quality for supported titles.",
            "Simultaneous streaming on up to four devices.",
            "Exclusive access to behind-the-scenes content, director's cuts, and special features.",
            "Priority customer support."
        ]
    }
];

export default function Membership() {
    return (
        <div className="flex flex-col py-20 w-[85%] mx-auto">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <img src="/video-horizontal.svg" alt="Membership" className="w-7 h-7" />
                    <h2 className="text-3xl font-bold text-white">Explore Our Membership Options</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                    From essential access to our vast movie library to premium 4K viewing, find the perfect subscription for your cinematic journey.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {membershipPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-[#111111] border border-[#222222] rounded-xl p-8 flex flex-col hover:border-gray-500 transition-colors duration-300"
                    >
                        <h3 className="text-3xl font-semibold text-white mb-8">
                            {plan.name}
                        </h3>
                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-400 text-[13px] leading-relaxed">
                                    <span className="text-red-600 text-lg leading-none mt-0.5">•</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">${plan.price}</span>
                            <span className="text-gray-500 text-sm">/month</span>
                        </div>
                        <button className="w-full cursor-pointer text-white font-medium py-3.5 rounded-md transition-colors bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700">
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}