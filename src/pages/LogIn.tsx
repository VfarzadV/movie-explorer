import Navbar from '../components/Navbar';
import Footer from "../components/Footer"
import SignIn from "../components/SignIn"

export default function LogIn() {
  return (
    <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
      <Navbar />
      <SignIn />
      <Footer />
    </div>
  );
}