/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, type ReactNode } from 'react';
import type { User, AuthContextType } from "../types";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    
    
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('movieWatchUser');
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        return null;
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('movieWatchUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('movieWatchUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};