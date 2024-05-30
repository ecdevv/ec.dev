import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Hero from "./components/Hero/Hero";
import { Portfolio } from "./components/Portfolio/Portfolio";

export default function Home() {
  return (
    <main>
      <Hero/>
      <About/>
      <Portfolio/>
      <Contact/>
    </main>
  );
}
