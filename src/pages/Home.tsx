import HomeHeader from '../components/HomeHeader';
import Genres from "../components/Genres"
import TopRatedMovies from "../components/TopRatedMovies"
import Suggest from "../components/Suggest"
import Membership from "../components/Membership"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">

      <HomeHeader />
      <Genres />
      <TopRatedMovies />
      <Suggest />
      <Membership />
      <Footer />
    </div>
  );
}