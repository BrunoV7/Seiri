import About from "@/components/about";
import Cta from "@/components/cta";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Who from "@/components/who";
import Why from "@/components/why";

export default function LandingPage(){
  return(
    <div className="min-h-screen gap-4 lg:w-10/12 md:w-8/12 w-11/12 mx-auto ">
      <Hero></Hero>
      {/*<Features></Features> */}
      <Why></Why>
      <Who></Who>
      <Cta></Cta>
      <About></About>
      <Footer></Footer>
    </div>
  )
}