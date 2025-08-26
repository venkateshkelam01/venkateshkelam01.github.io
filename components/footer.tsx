import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-10 md:py-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Venkatesh. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/venkateshkelam01" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com/in/venkatesh0101" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:venkateshkelam01@gmail.com">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;