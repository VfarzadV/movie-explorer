/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import type { MovieType } from '../types';

interface WatchlistContextType {
    watchlist: MovieType[];
    toggleWatchlist: (movie: MovieType) => void;
    isInWatchlist: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
    const [watchlist, setWatchlist] = useState<MovieType[]>(() => {
        const saved = localStorage.getItem('movieWatchlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (movie: MovieType) => {
        setWatchlist(prev => {
            const exists = prev.find(item => item.id === movie.id);
            if (exists) {
                return prev.filter(item => item.id !== movie.id);
            } else {
                return [movie, ...prev];
            }
        });
    };

    const isInWatchlist = (id: number) => {
        return watchlist.some(item => item.id === id);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) throw new Error("useWatchlist must be used within WatchlistProvider");
    return context;
};