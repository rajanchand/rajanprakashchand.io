
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Network } from "lucide-react";

const experienceData = [
  {
    company: "Worldlink Communication Ltd.",
    position: "Technical Supervisor",
    period: "2018 - 2022",
    description: "Led a team of technical support staff to resolve customer issues. Managed network troubleshooting, infrastructure maintenance, and technical documentation. Improved customer satisfaction rates by 80% through implementing efficient support protocols.",
    skills: ["Technical Support", "Team Leadership", "Network Management", "Customer Service"],
    icon: Network
  },
  {
    company: "Dish Media Network",
    position: "Customer Supervisor",
    period: "2022 - 2024",
    description: "Supervised customer service operations, handled escalated customer issues, and maintained service quality standards. Trained new staff and developed customer service protocols to improve response time and satisfaction.",
    skills: ["Customer Relations", "Staff Training", "Problem Resolution", "Service Quality"],
    icon: Building
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {experienceData.map((exp, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform"
            >
              <CardHeader className="bg-primary/5 dark:bg-primary/10 pb-2">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <exp.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <div className="text-lg font-medium text-primary">{exp.company}</div>
                    <div className="text-sm text-muted-foreground">{exp.period}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
