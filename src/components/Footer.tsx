import { Github, Instagram, Linkedin, Facebook, Heart, Link as LinkIcon, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: LinkIcon, href: "https://linktr.ee", label: "Linktree" },
    { icon: Users, href: "https://www.linkedin.com/groups/", label: "Professional Memberships" },
  ];
  
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={`bg-secondary dark:bg-secondary/30 py-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="transition-all duration-500 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Rajan Prakash Chand</h3>
            <p className="text-muted-foreground mb-4">
              IT professional specializing in technical supervision and customer support, currently pursuing Master's in IT at the University of the West of Scotland.
            </p>
            <div className="flex space-x-4">
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
          
          <div className="transition-all duration-500 delay-100 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="mr-2">→</span> {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://linktr.ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                >
                  <LinkIcon className="h-4 w-4 mr-2" /> Connect with me
                </a>
              </li>
            </ul>
          </div>
          
          <div className="transition-all duration-500 delay-200 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors duration-300">Paisley, Scotland, UK</li>
              <li>
                <a href="mailto:rajanchand48@gmail.com" className="hover:text-primary transition-colors duration-300 hover:underline">
                  rajanchand48@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+447570731478" className="hover:text-primary transition-colors duration-300 hover:underline">
                  +44 7570 731478
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center text-muted-foreground">
          <p className="flex items-center justify-center group">
            © {currentYear} Rajan Prakash Chand. All rights reserved. Made with <Heart className="h-4 w-4 text-red-500 mx-1 group-hover:animate-pulse" /> in Scotland
          </p>
        </div>
      </div>
    </footer>
  );
}
