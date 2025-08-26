import { Briefcase, ArrowRight } from "lucide-react";
import { TimelineLayout } from "@/components/ui/timeline/timeline-layout";
import { TimelineItem } from "@/components/ui/timeline/timeline";
import { useState, useEffect } from "react";

interface ExperienceItem {
  title: string;
  subtitle: string;
  workType: string;
  workDescription: string[];
  dateText: string;
}

interface ExperiencesData {
  experiences: ExperienceItem[];
}

const Experience = () => {
  const [experiencesData, setExperiencesData] = useState<ExperiencesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiencesData() {
      try {
        const response = await fetch('/profile/experiences.json');
        const data = await response.json();
        setExperiencesData(data);
      } catch (error) {
        console.error('Error loading experiences data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiencesData();
  }, []);

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">Work Experience</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TimelineLayout>
            {experiencesData?.experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                index={index}
                title={exp.title}
                subtitle={exp.subtitle}
                dateText={`${exp.dateText} • ${exp.workType}`}
                icon={<Briefcase className="h-5 w-5 text-white" />}
              >
                <ul className="space-y-2">
                  {exp.workDescription.map((description, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>{description}</span>
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
          </TimelineLayout>
        )}
      </div>
    </section>
  );
};

export default Experience;