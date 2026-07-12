import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext"; 

export default function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim().length >= 5 && password.trim().length >= 8) {
            
            login({
                name: username,
                email: `${username}@example.com`,
                password: password
            });

            await Swal.fire({
                title: "Welcome!",
                text: `${username} Welcome to our site. enjoy!!!`,
                icon: "success",
                confirmButtonText: "go to site",
                confirmButtonColor: "#CC0000", 
                background: "#111111", 
                color: "#ffffff",
                timer: 3000,
                backdrop: true,
            });
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#0A0A0A] border border-[#222222] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-20 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-8">
                        <span className="text-[#CC0000]">Welcome</span> <span className="text-white">back</span>
                    </h2>
                    <form className="flex flex-col gap-5" onSubmit={userLogin} >
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-red-600 rounded bg-[#111111] border-gray-700 cursor-pointer"
                                />
                                Remember me
                            </label>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Forget Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            disabled={username.trim().length < 5 || password.trim().length < 8}
                            className="w-full px-6 py-3.5 text-white font-medium rounded-lg shadow-md transition-all duration-300
                            bg-linear-to-r from-red-600 to-red-800 
                            hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-800 disabled:transform-none disabled:shadow-none"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px bg-gray-800 flex-1"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </div>
                    <button className="flex items-center justify-center gap-3 w-full py-3 bg-transparent border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <img src="/search.svg" alt="Google" className="w-5 h-5" />
                        Sign up with Google
                    </button>
                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Don't have an account yet? <Link to="/Register" className="text-white hover:text-red-500 font-medium transition-colors">Sign up</Link>
                    </p>
                </div>
                <div className="hidden md:block w-1/2 bg-[#050505]">
                    <img src="/Pics.jpg" className="w-full h-full object-cover" alt="Movie" />
                </div>
            </div>
        </div>
    );
}