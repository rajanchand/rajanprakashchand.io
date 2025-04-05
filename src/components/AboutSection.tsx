
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-10 mt-12">
          <div className="lg:w-1/3 animate-slide-in-left">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Rajan Prakash Chand"
                className="w-full object-cover"
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <Button asChild variant="default" size="lg" className="w-full">
                <a href="/placeholder.svg" download="Rajan-Chand-Resume.pdf">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  Schedule a Meeting
                </a>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-2/3 space-y-6 animate-slide-in-right">
            <p className="text-xl leading-relaxed">
              Hello! I'm Rajan Prakash Chand, an IT professional with a passion for technology and problem-solving. Currently pursuing my Master's in IT at the University of the West of Scotland, I'm expanding my knowledge and expertise in the field I love.
            </p>
            
            <p className="leading-relaxed">
              My professional journey includes working as a Technical Supervisor at Worldlink Communication Ltd., where I led a team in resolving technical issues and maintaining network infrastructure. Prior to that, I served as a Customer Supervisor at Dish Media Network, focusing on enhancing customer experience and service quality.
            </p>
            
            <p className="leading-relaxed">
              I believe in the transformative power of technology to solve real-world problems. My approach combines technical expertise with excellent communication skills to deliver solutions that are both effective and user-friendly. I'm driven by challenges and constantly seeking opportunities to learn and grow in this ever-evolving field.
            </p>
            
            <p className="leading-relaxed">
              Outside of my professional life, I enjoy staying updated with the latest technological trends, participating in tech communities, and contributing to open-source projects. I also value work-life balance and make time for outdoor activities and travel.
            </p>
            
            <p className="leading-relaxed">
              I'm always open to connecting with like-minded professionals and exploring new opportunities. Feel free to reach out through the contact form or schedule a meeting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
