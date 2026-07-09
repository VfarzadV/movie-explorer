import Footer from "../components/Footer"
import MovieDetailDescription from "../components/MovieDetailDescription"
import Comments from "../components/Comments"
import RelatedMovies from "../components/RelatedMovies"

export default function MovieDetail() {
    return (
        <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
            <MovieDetailDescription />
            <Comments />
            <RelatedMovies />
            <Footer />
        </div>
    )
}
