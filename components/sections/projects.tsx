import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface ProjectLink {
  text: string;
  href: string;
}

interface Project {
  image: string;
  title: string;
  bodyText: string;
  links: ProjectLink[];
  tags: string[];
  cropTopPercent?: number;
}

interface ProjectsData {
  projects: Project[];
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {
    async function fetchProjectsData() {
      try {
        const response = await fetch('/profile/projects.json');
        const data = await response.json();
        // Reverse the projects array before setting the state
        data.projects = [...data.projects].reverse();
        setProjectsData(data);
      } catch (error) {
        console.error('Error loading projects data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectsData();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">Featured Projects</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative max-w-5xl w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projectsData?.projects.map((project, index) => (
                  <div key={index} className="pr-4 flex-shrink-0">
                    <Card className="flex flex-col w-80 h-80 mb-6">
                      <div className="relative flex-1 bg-muted overflow-hidden rounded-t-xl">
                        {project.image && (
                          <Image
                            src={`/${project.image}`}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{project.bodyText}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          {project.links.map((link, i) => (
                            <Button key={i} variant={i === 0 ? "outline" : "default"} size="sm" asChild>
                              <Link href={link.href} target="_blank" rel="noopener noreferrer">
                                {link.text === "GitHub" && <Github className="mr-2 h-4 w-4" />}
                                {link.text === "Live" && <ExternalLink className="mr-2 h-4 w-4" />}
                                {link.text}
                              </Link>
                            </Button>
                          ))}
                        </CardFooter>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-12 w-12 p-3 rounded-full z-10"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous project</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-12 w-12 p-3 rounded-full z-10"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next project</span>
            </Button>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex gap-2">
                {projectsData?.projects.map((_, index) => (
                  <span
                    key={index}
                    className={`block h-2 w-2 rounded-full ${index === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;