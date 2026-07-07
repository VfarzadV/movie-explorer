import HomeHeader from '../components/HomeHeader';
import Genres from "../components/Genres"
import TopRatedMovies from "../components/TopRatedMovies"
import Suggest from "../components/suggest"

export default function Home() {
  return (
    <div className="font-martel bg-linear-to-b from-[#292929] to-[#0A0A0A] ">

      <HomeHeader />
      <Genres />
      <TopRatedMovies />
      <Suggest />
    </div>
  );
}