import Navbar from '../components/Navbar';
import SupportTitle from "../components/SupportTitle"
import Footer from "../components/Footer"
import ContactUs from "../components/ContactUs"

export default function Support() {
  return (
    <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
    
          <Navbar />
          <SupportTitle />
          <ContactUs />
          <Footer />
        </div>
  )
}
