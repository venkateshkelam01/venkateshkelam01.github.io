import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AlignRight, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastFirstSection, setPastFirstSection] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigationLinks = useMemo(() => [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      // Basic scroll detection
      setScrolled(window.scrollY > 10);
      
      // Check if we're past the hero section (assuming it's viewport height)
      const viewportHeight = window.innerHeight;
      setPastFirstSection(window.scrollY > viewportHeight * 0.7);
      
      // Determine active section based on scroll position
      const sections = ["home", ...navigationLinks.map(link => link.id)];
      
      let currentActive = sections[0];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentActive = section;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Execute once on mount to set the initial active section
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navigationLinks]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed transition-all duration-300 ${
      scrolled 
        ? "bg-background/80 backdrop-blur-md shadow-md" 
        : "bg-transparent"
      } ${
        pastFirstSection 
          ? "top-4 left-1/2 transform -translate-x-1/2 rounded-full border border-secondary" 
          : "top-0 left-0 right-0"
      } z-50`}>
      <div className={`mx-auto flex items-center justify-between transition-all duration-300 ${
        pastFirstSection 
          ? "h-12 px-8 md:px-8 w-auto" 
          : "h-16 px-4 md:px-6 container"
      }`}>
        <button 
          onClick={() => scrollToSection("home")} 
          className={`font-bold transition-all duration-300 hover:text-primary cursor-pointer ${
            activeSection === "home" ? "text-primary font-extrabold" : ""
          } ${pastFirstSection ? "text-lg" : "text-xl"}`}
        >
          VK
        </button>

        <nav className="hidden md:flex items-center ml-5">
          <div className="flex gap-6">
            {navigationLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className={`text-sm hover:text-primary transition-colors cursor-pointer no-underline ${
                  activeSection === link.id ? "font-bold text-primary" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="ml-8 flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline cursor-pointer">Resume</a>
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <AlignRight />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-t py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className={`text-sm py-2 hover:text-primary transition-colors cursor-pointer no-underline ${
                  activeSection === link.id ? "font-bold text-primary" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline cursor-pointer">Resume</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;