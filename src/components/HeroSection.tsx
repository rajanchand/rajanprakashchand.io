
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Facebook, Link } from "lucide-react";

export default function HeroSection() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Link, href: "https://linktr.ee", label: "Linktree" },
  ];

  return (
    <section id="home" className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="order-2 lg:order-1 max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Rajan Prakash Chand</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A passionate IT professional with expertise in technical supervision and customer support. Currently pursuing Master's in IT at the University of the West of Scotland, Paisley.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full animate-bounce">
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <a href="#about">About Me</a>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <span className="text-muted-foreground">Connect with me:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon hover:scale-125 transition-transform duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-primary/20 shadow-xl animate-pulse hover:border-primary transition-all duration-300">
            <img
              src="/rajanchand.JPG"
              alt="Rajan Prakash Chand"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
