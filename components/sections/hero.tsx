import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';

interface HomeData {
  name: string;
  roles: string[];
  about: string;
  imageSource: string;
}

const Hero = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await fetch('/profile/home.json');
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Prepare animation sequence for TypeAnimation
  const animationSequence = homeData?.roles.flatMap(role => 
    ['I\'m ' + role, 2000]
  ) || [];

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Hi, I&apos;m</span>
              <span className="block text-primary">{homeData?.name || 'Venkatesh'}</span>
            </h1>
            <div className="mt-4 text-xl text-muted-foreground max-w-[700px] md:text-2xl h-[60px]">
              {homeData?.roles && homeData.roles.length > 0 && (
                <TypeAnimation
                  sequence={animationSequence}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                />
              )}
            </div>
            <div className="mt-8 flex gap-4">
              <Button onClick={scrollToProjects} size="lg">
                View My Work
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
              </Button>
            </div>
            <div className="absolute bottom-8 animate-bounce">
              <Button variant="ghost" size="icon" onClick={scrollToProjects}>
                <ArrowDown className="h-6 w-6" />
                <span className="sr-only">Scroll down</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;