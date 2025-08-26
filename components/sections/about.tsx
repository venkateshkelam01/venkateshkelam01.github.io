import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface AboutData {
  about: string;
  imageSource: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch('/profile/about.json');
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">About Me</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl w-full">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-primary">
                {aboutData?.imageSource ? (
                  <Image 
                    src={`/${aboutData.imageSource}`} 
                    alt="Profile" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    Your Image Here
                  </div>
                )}
              </div>
            </div>
            <div>
              {aboutData?.about ? (
                aboutData.about.split('\n\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg text-muted-foreground">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="mb-6 text-lg text-muted-foreground">
                    Hello! I&apos;m a passionate software engineer with a strong background in full-stack development.
                  </p>
                  <p className="mb-6 text-lg text-muted-foreground">
                    I specialize in building responsive web applications with modern technologies.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-muted-foreground">
                MS in Information Systems<br />
                Northeastern University<br />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-muted-foreground">
                Currently based in San Jose, CA<br />
                Available remote and relocation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Interests</h3>
              <p className="text-muted-foreground">
                Software Engineering<br />
                Full Stack Developer<br />
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;