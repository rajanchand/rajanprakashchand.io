
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useRef } from "react";

const skillsData = {
  technical: [
    { name: "Network Administration", level: 90 },
    { name: "Technical Support", level: 95 },
    { name: "IT Infrastructure", level: 85 },
    { name: "System Analysis", level: 80 },
  ],
  software: [
    { name: "Microsoft Office", level: 90 },
    { name: "Database Management", level: 75 },
    { name: "Network Monitoring Tools", level: 85 },
    { name: "Ticketing Systems", level: 90 },
  ],
  soft: [
    { name: "Customer Service", level: 95 },
    { name: "Team Leadership", level: 85 },
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 95 },
  ],
};

export default function SkillsSection() {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start by showing the first skill category
          setVisibleSection("technical");
          
          // Then show the others with a delay
          setTimeout(() => setVisibleSection("software"), 400);
          setTimeout(() => setVisibleSection("soft"), 800);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const SkillCategory = ({ title, skills, isVisible }: { title: string; skills: { name: string; level: number }[]; isVisible: boolean }) => (
    <div className={`space-y-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress value={isVisible ? skill.level : 0} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-secondary/30 dark:bg-secondary/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <SkillCategory 
                title="Technical Skills" 
                skills={skillsData.technical} 
                isVisible={visibleSection === "technical"} 
              />
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <SkillCategory 
                title="Software Skills" 
                skills={skillsData.software} 
                isVisible={visibleSection === "software"} 
              />
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <SkillCategory 
                title="Soft Skills" 
                skills={skillsData.soft} 
                isVisible={visibleSection === "soft"} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
