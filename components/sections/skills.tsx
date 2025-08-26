import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import React, { SVGProps } from "react";

interface SkillItem {
  icon: string;
  title: string;
}

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

interface SkillsData {
  intro: string;
  skills: SkillCategory[];
}

// Dynamic function to get icons from Lucide
const DynamicIcon = ({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) => {
  const IconComponent = (Icons[name as keyof typeof Icons] || Icons.Code) as React.ElementType;
  return <IconComponent {...props} />;
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkillsData() {
      try {
        const response = await fetch('/profile/skills.json');
        const data = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.error('Error loading skills data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkillsData();
  }, []);

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-6 md:text-4xl">Skills & Expertise</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {skillsData?.intro && (
              <p className="text-lg text-muted-foreground text-center max-w-2xl mb-12 whitespace-pre-line">
                {skillsData.intro}
              </p>
            )}
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl w-full">
              {skillsData?.skills.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-6 text-center">{category.title}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {category.items.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex flex-col items-center">
                          <div className="h-12 w-12 mb-2 flex items-center justify-center">
                            <DynamicIcon 
                              name={skill.icon} 
                              className="h-8 w-8" 
                              strokeWidth={1.5} 
                            />
                          </div>
                          <span className="text-sm text-center">{skill.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Skills;