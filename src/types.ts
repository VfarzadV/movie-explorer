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