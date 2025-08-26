import { useState, useEffect, useCallback } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

interface Certificate {
  image: string;
  title: string;
  university: string;
  links: {
    text: string;
    href: string;
  }[];
  cropTopPercent?: number;
}

interface CertificatesData {
  certificates: Certificate[];
}

const Certificates = () => {
  const [certificatesData, setCertificatesData] = useState<CertificatesData | null>(null);
  const [loading, setLoading] = useState(true);

  // Carousel state
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    async function fetchCertificatesData() {
      try {
        const response = await fetch('/profile/certificates.json');
        const data = await response.json();
        // Reverse the certificates array before setting the state
        data.certificates = [...data.certificates].reverse();
        setCertificatesData(data);
      } catch (error) {
        console.error('Error loading certificates data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificatesData();
  }, []);

  return (
    <section id="certificates" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">Certificates</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative max-w-5xl w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {certificatesData?.certificates.map((certificate, index) => (
                  <div key={index} className="pr-4 flex-shrink-0">
                    <Card className="flex flex-col w-80 h-100 mb-6">
                      <div className="relative bg-muted overflow-hidden rounded-t-xl">
                        {certificate.image && (
                          <Image
                            src={`/${certificate.image}`}
                            alt={certificate.title}
                            width={320}
                            height={247}
                            className="w-full h-auto object-contain"
                          />
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{certificate.title}</CardTitle>
                      </CardHeader>
                      <div className="flex-grow" />
                      <CardFooter className="mt-auto">
                        {certificate.links.map((link, i) => (
                          <Button key={i} variant="outline" size="sm" asChild>
                            <Link href={link.href} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View on {link.text}
                            </Link>
                          </Button>
                        ))}
                      </CardFooter>
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
              <span className="sr-only">Previous certificate</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-12 w-12 p-3 rounded-full z-10"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next certificate</span>
            </Button>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex gap-2">
                {certificatesData?.certificates.map((_, index) => (
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

export default Certificates;