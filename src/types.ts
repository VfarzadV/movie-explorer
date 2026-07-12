export interface SectionTitleProps {
  title: string;
  icon: string;
}
export interface GenreType {
  id: number;
  title: string;
  image: string;
}
export interface MovieType {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: string;
  releaseDate: string;
  description: string;
}
export interface TMDBMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    overview: string;
}
export interface HomeHeaderTitleProps {
  id: number;
    title: string;
    overview: string;
    onNext: () => void;
    onPrev: () => void;
    prevImage: string | null; 
    nextImage: string | null;
}
export interface User {
    name: string;
    email: string;
    password: string;
}
export interface AuthContextType {
    user: User | null; 
    login: (userData: User) => void;
    logout: () => void;
}
export interface MovieDetails {
    backdrop_path: string | null;
    poster_path: string | null;
    title: string;
    release_date: string;
    vote_count: number;
    vote_average: number;
    runtime: number | null;
    overview: string;
    genres: Genre[];
    credits?: {
        cast: CastMember[];
    };
    success?: boolean;
}
export interface Genre {
    id: number;
    name: string;
}

export interface CastMember {
    name: string;
}