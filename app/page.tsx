import About from "@/components/about";
import Cta from "@/components/cta";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Who from "@/components/who";
import Why from "@/components/why";

export default function LandingPage(){
  return(
    <div className="min-h-screen gap-4">
      <Hero></Hero>
      <Why></Why>
      <Who></Who>
      <Cta></Cta>
      <About></About>
      <Footer></Footer>
    </div>
  )
}