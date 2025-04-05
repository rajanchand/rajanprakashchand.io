
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const educationData = [
  {
    degree: "Master in IT",
    institution: "University of the West of Scotland",
    location: "Paisley",
    year: "2025 - Present",
    description: "Focusing on advanced IT concepts, software development, and system analysis.",
    logo: "/uni.svg",
    notes: "Specialized in information systems management and IT infrastructure planning."
  },
  {
    degree: "Bachelor in Computer Science and IT",
    institution: "Asian College of Higher Studies (Tribhuvan University)",
    location: "Nepal",
    year: "2016 - 2022",
    description: "Studied computer programming, database management,Networking, software engineering, and IT infrastructure.",
    logo: "/uni.svg",
    notes: "Graduated with honors, focusing on networking and system administration."
  },
  {
    degree: "Gorkha Higher Secondary School (Science)",
    institution: "Tulsipur",
    location: "Dang, Nepal",
    year: "2013 - 2015",
    description: "Completed higher secondary education with a focus on science subjects including mathematics and physics.",
    logo: "/uni.svg",
    notes: "Achieved excellence"
  },
  {
    degree: "School level Certification(S.L.C)",
    institution: "Tulsi Baording higher secondary Schoool",
    location: "Dang,Nepal",
    year: "2010 - 2013",
    description: "Completed  Secondary education",
    logo: "/uni.svg",
    notes: "Achieved excellence"
  },
];

export default function EducationSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start revealing education items with a staggered delay
          educationData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 300);
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

  return (
    <section id="education" className="py-20 bg-secondary/50 dark:bg-secondary/10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {educationData.map((edu, index) => (
            <Card
              key={index}
              className={`border-none shadow-md overflow-hidden transition-all duration-500 ${
                visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-primary font-medium">{edu.year}</div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="text-muted-foreground mb-2">
                      {edu.institution}, {edu.location}
                    </div>
                    <p className="text-sm mb-3">{edu.description}</p>
                    <div className="bg-secondary/50 p-3 rounded-md text-sm italic">
                      {edu.notes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
