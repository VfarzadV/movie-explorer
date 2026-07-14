import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SignUp() {
    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,3}$/;
    const [name, setName] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const passwordsMatch = formData.password === formData.confirmPassword;
    const isFormValid =
        name.trim().length >= 3 &&
        formData.username.trim().length >= 5 &&
        emailRegex.test(formData.email.trim()) &&
        formData.password.trim().length >= 8 &&
        passwordsMatch

    const userRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid) {
            await Swal.fire({
                title: "Account Created!",
                text: `Welcome aboard, ${name}! Your account has been successfully created.`,
                icon: "success",
                confirmButtonText: "Go to Login",
                confirmButtonColor: "#CC0000",
                background: "#111111",
                color: "#ffffff",
                timer: 3000,
                backdrop: true,
            });
            navigate("/Login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#0A0A0A] border border-[#222222] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-20 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-8">
                        <span className="text-white">Create an</span> <span className="text-[#CC0000]">Account</span>
                    </h2>
                    <form className="flex flex-col gap-5" onSubmit={userRegister}>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Farzad Vatandoust"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Choose a Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-gray-300 text-sm">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className={`bg-[#111111] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${formData.confirmPassword.length > 0 && !passwordsMatch
                                    ? "border-red-500"
                                    : "border-gray-700 focus:border-red-600"
                                    }`}
                            />
                            {formData.confirmPassword.length > 0 && !passwordsMatch && (
                                <span className="text-red-500 text-xs absolute -bottom-5">
                                    Passwords do not match
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full px-6 py-3.5 mt-4 text-white font-medium rounded-lg shadow-md transition-all duration-300 bg-linear-to-r from-red-600 to-red-800 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-800 disabled:transform-none disabled:shadow-none"
                        >
                            Sign Up
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
                        Already have an account? <Link to="/Login" className="text-white hover:text-red-500 font-medium transition-colors">Log in</Link>
                    </p>
                </div>
                <div className="hidden md:block w-1/2 bg-[#050505]">
                    <img src="/Pics.jpg" className="w-full h-full object-cover" alt="Movies Collage" />
                </div>
            </div>
        </div>
    );
}