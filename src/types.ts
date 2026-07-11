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
    title: string;
    overview: string;
    onNext: () => void;
    onPrev: () => void;
    prevImage: string | null; 
    nextImage: string | null;
}