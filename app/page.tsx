import CustomCursor from "@/components/CustomCursor";
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
    <>
      <CustomCursor />
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
    </>
  );
}
