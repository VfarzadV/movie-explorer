const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export const apiEndpoints = {
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  popular: (page: number) =>
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  search: (query: string, page: number) =>
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
  movieDetails: (id: string | number) =>
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`,
  discoverMoviesByGenre: (genreId: string | number, page: number = 1) =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`,
  discoverSeriesByGenre: (genreId: string | number, page: number = 1) =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`,
  popularSeries: (page: number) =>
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  searchSeries: (query: string, page: number) =>
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
  SeriesDetails: (id: string | number) =>
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`,
  discoverAnime: (page: number) =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16&with_original_language=ja&page=${page}`,
  similarMovies: (id: string | number) =>
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  similarSeries: (id: string | number) =>
    `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  movieVideos: (id: string | number) =>
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
  seriesVideos: (id: string | number) =>
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`,
  searchMulti: (query: string, page: number = 1) =>
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
  movieReviews: (id: string | number) =>
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  seriesReviews: (id: string | number) =>
    `${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
};
