
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projectsData = [
  {
    title: "Network Monitoring Dashboard",
    description: "A comprehensive dashboard for monitoring network performance, traffic, and potential issues in real-time. Implemented alerts and automated response systems.",
    technologies: ["Python", "React", "MongoDB", "WebSockets"],
    liveLink: "#",
    repoLink: "#",
    image: "/placeholder.svg"
  },
  {
    title: "Customer Support Portal",
    description: "Developed a streamlined portal for customer support, featuring ticket management, knowledge base, and live chat functionality to improve response times.",
    technologies: ["Node.js", "Express", "MySQL", "Socket.io"],
    liveLink: "#",
    repoLink: "#",
    image: "/placeholder.svg"
  },
  {
    title: "IT Resource Management System",
    description: "A system to track and manage IT resources including hardware, software licenses, and maintenance schedules to optimize resource allocation.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf"],
    liveLink: "#",
    repoLink: "#",
    image: "/placeholder.svg"
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/50 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Recent Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projectsData.map((project, index) => (
            <Card key={index} className="overflow-hidden h-full flex flex-col border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between gap-4 pt-0">
                <Button asChild variant="outline" size="sm" className="w-1/2">
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
                <Button asChild variant="default" size="sm" className="w-1/2">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
