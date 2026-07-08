import Navbar from '../components/Navbar';
import Footer from "../components/Footer"
import SignUp from '../components/SignUp';

export default function Register() {
  return (
    <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
      <Navbar />
      <SignUp />
      <Footer />
    </div>
  );
}