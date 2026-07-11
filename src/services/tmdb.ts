const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const apiEndpoints = {
    topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    popular: (page: number) => `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    search: (query: string, page: number) => `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
};