
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Headset, Users, Terminal, Server, Briefcase } from "lucide-react";

const skillsData = {
  customerSupport: {
    icon: Headset,
    name: "Customer Support",
    description: "Expert in providing technical assistance and resolving customer issues with a focus on satisfaction and efficiency."
  },
  customerHandling: {
    icon: Users,
    name: "Customer Handling",
    description: "Skilled in managing customer relationships, addressing concerns, and ensuring positive customer experiences."
  },
  technicalSupport: {
    icon: Terminal,
    name: "Technical Support",
    description: "Strong ability to diagnose and resolve complex technical issues, providing timely and effective solutions."
  },
  devops: {
    icon: Server,
    name: "DevOps",
    description: "Experience with implementing continuous integration/continuous deployment workflows and infrastructure management."
  },
  projectLead: {
    icon: Briefcase,
    name: "Project Lead",
    description: "Proven track record of leading technical teams, managing project lifecycles, and delivering successful outcomes."
  }
};

export default function SkillsSection() {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start revealing skills with a staggered delay
          const skills = Object.keys(skillsData);
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setVisibleSection(prev => prev ? `${prev},${skill}` : skill);
            }, index * 200);
          });
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

  const isSkillVisible = (skillKey: string) => {
    return visibleSection ? visibleSection.includes(skillKey) : false;
  };

  return (
    <section id="skills" className="py-20 bg-secondary/30 dark:bg-secondary/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {Object.entries(skillsData).map(([key, skill]) => (
            <Card 
              key={key} 
              className={`border-none shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isSkillVisible(key) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <skill.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
