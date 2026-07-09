import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactUs() {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,3}$/;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const isFormValid =
        formData.name.trim().length > 2 &&
        emailRegex.test(formData.email.trim()) &&
        formData.subject.trim().length > 2 &&
        formData.message.trim().length > 10;
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid) {
            await Swal.fire({
                title: "Message Sent!",
                text: `Thanks for reaching out, ${formData.name}. We'll get back to you soon!`,
                icon: "success",
                confirmButtonText: "Close",
                confirmButtonColor: "#CC0000",
                background: "#111111",
                color: "#ffffff",
                timer: 4000,
                backdrop: true,
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        }
    };

    return (
        <div className=" flex items-center justify-center p-4 py-12">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-[#0A0A0A] border border-[#222222] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-[#050505]">
                    <h2 className="text-3xl font-semibold mb-6">
                        <span className="text-[#CC0000]">Contact</span> <span className="text-white">Information</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-10">
                        Got questions or suggestions? Get in touch with MovieWatch! Email us for a quick reply, call us for a personal chat, or connect on social media for updates. Your feedback counts!
                        <br /><br />
                        Alternatively, you can fill out our form, and we'll connect with you soon!
                    </p>
                    <div className="flex flex-col gap-6 mb-10">
                        <div className="flex items-center gap-4 text-gray-300">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span className="text-sm">+1012 3294 173</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="text-sm">MovieWatch@gmail.com</span>
                        </div>
                        <div className="flex items-start gap-4 text-gray-300">
                            <svg className="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="text-sm leading-relaxed">
                                384 Dartmouth Street Boston, Massachusetts 72556<br />United States
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-[#111111] border border-gray-800 p-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                            <img src="/telegram_app.svg" alt="Telegram" className="w-5 h-5" />
                        </button>
                        <button className="bg-[#111111] border border-gray-800 p-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                            <img src="/twitter.svg" alt="X" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Subject</label>
                            <input
                                type="text"
                                placeholder="Enter subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Type your message here..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full px-6 py-3.5 mt-2 text-white font-medium rounded-lg shadow-md transition-all duration-300 bg-linear-to-r from-red-600 to-red-800 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-800 disabled:transform-none disabled:shadow-none"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}