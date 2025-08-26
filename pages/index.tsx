import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Education from "@/components/sections/education";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Certificates from "@/components/sections/certificates";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  return (
    <div className={cn(
      "min-h-screen bg-background font-sans antialiased",
      inter.variable
    )}>
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
