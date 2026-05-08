import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Markers from "@/components/Markers";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Productos from "@/components/Productos";
import Categorias from "@/components/Categorias";
import Nosotros from "@/components/Nosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Loader />
      <Markers />
      <Navbar />
      <main>
        <Hero />
        <Productos />
        <Categorias />
        <Historia />
        <Nosotros />
        <Contacto />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
