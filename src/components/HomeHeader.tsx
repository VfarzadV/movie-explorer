import Navbar from './Navbar';
import HomeHeaderTitle from './HomeHeaderTitle';

export default function HomeHeader() {
  return (
    <div className="w-full h-275 bg-[url('/public/Picture.jpg')] bg-cover bg-center relative">   
    <Navbar />
    <HomeHeaderTitle />
    </div>
  )
}
