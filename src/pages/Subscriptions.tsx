import Navbar from '../components/Navbar';
import SubscriptionsTitle from "../components/SubscriptionsTitle"
import Membership from "../components/Membership"
import Footer from "../components/Footer"

export default function Subscriptions() {
  return (
    <div className="font-martel bg-linear-to-b from-[#191919] to-[#0A0A0A] ">
    
          <Navbar />
          <SubscriptionsTitle />
          <Membership />
          <Footer />
        </div>
  )
}
