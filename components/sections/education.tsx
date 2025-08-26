import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TimelineLayout } from "@/components/ui/timeline/timeline-layout";
import { TimelineItem } from "@/components/ui/timeline/timeline";

interface EducationItem {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  courses: string[];
}

interface EducationData {
  education: EducationItem[];
}

const Education = () => {
  const [educationData, setEducationData] = useState<EducationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducationData() {
      try {
        const response = await fetch('/profile/education.json');
        const data = await response.json();
        setEducationData(data);
      } catch (error) {
        console.error('Error loading education data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEducationData();
  }, []);

  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">Education</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TimelineLayout>
            {educationData?.education.map((edu, index) => (
              <TimelineItem
                key={index}
                index={index}
                title={edu.cardTitle}
                subtitle={edu.cardSubtitle}
                dateText={edu.title}
                icon={<GraduationCap className="h-5 w-5 text-white" />}
              >
                <p className="text-muted-foreground mb-2">{edu.cardDetailedText}</p>
                {edu.courses && edu.courses.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {edu.courses.map((course, i) => (
                      <Badge key={i} variant="secondary">{course}</Badge>
                    ))}
                  </div>
                )}
              </TimelineItem>
            ))}
          </TimelineLayout>
        )}
      </div>
    </section>
  );
};

export default Education;