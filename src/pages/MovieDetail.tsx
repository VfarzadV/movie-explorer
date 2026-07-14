import Footer from "../components/Footer"
import MovieDetailDescription from "../components/MovieDetailDescription"
import CommentsSection from "../components/CommentsSection";
import RelatedMovies from "../components/RelatedMovies"
import { useParams } from "react-router-dom";

export default function MovieDetail() {
    const { id } = useParams();
    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
            <MovieDetailDescription />
            <CommentsSection mediaType="movie" id={id!} />
            <RelatedMovies id={id as string} mediaType="movie" />
            <Footer />
        </div>
    )
}
