import HomeSectionTitle from "./HomeSectionTitle";
import GenresBox from "./GenresBox";
export default function Genres() {
  return (
    <div className="flex flex-col  py-20 w-[85%] mx-auto ">
      <HomeSectionTitle title="Genres" icon="/public/Genres.svg" path="/genre" />
      <GenresBox />
    </div>
  )
}