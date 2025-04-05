
import { useState, useEffect, useRef } from "react";

const educationData = [
  {
    degree: "Master in IT",
    institution: "University of the West of Scotland",
    location: "Paisley",
    year: "2022 - Present",
    description: "Focusing on advanced IT concepts, software development, and system analysis.",
  },
  {
    degree: "Bachelor in Computer Science and IT",
    institution: "Tribhuvan University",
    location: "Nepal",
    year: "2014 - 2018",
    description: "Studied computer programming, database management, software engineering, and IT infrastructure.",
  },
  {
    degree: "Higher Secondary School (Science)",
    institution: "Tulsipur",
    location: "Dang, Nepal",
    year: "2012 - 2014",
    description: "Completed higher secondary education with a focus on science subjects including mathematics, physics, and computer science.",
  },
  {
    degree: "Professional Certification",
    institution: "Various Institutions",
    location: "Online",
    year: "2018 - 2022",
    description: "Completed various professional certifications in IT networking, system administration, and customer service.",
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
        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  visibleItems.includes(index) ? "animate-slide-in-left" : "opacity-0"
                }`}
              >
                <div className="mb-1 text-sm text-primary font-medium">{edu.year}</div>
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <div className="text-muted-foreground mb-1">
                  {edu.institution}, {edu.location}
                </div>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
