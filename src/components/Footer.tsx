
import { Github, Instagram, Linkedin, Facebook, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  ];
  
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary dark:bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
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
                  className="social-icon"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Paisley, Scotland, UK</li>
              <li>
                <a href="mailto:rajanchand48@gmail.com" className="hover:text-primary transition-colors">
                  rajanchand48@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+447570731478" className="hover:text-primary transition-colors">
                  +44 7570 731478
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center text-muted-foreground">
          <p className="flex items-center justify-center">
            © {currentYear} Rajan Prakash Chand. All rights reserved. Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> in Scotland
          </p>
        </div>
      </div>
    </footer>
  );
}
