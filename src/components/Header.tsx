import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Menu, X, Calendar, Clock, MapPin, CloudSun } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCurrentLocationAndWeather } from "@/utils/googleSheetsHelper";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [ipAddress, setIpAddress] = useState("");
  const [locationInfo, setLocationInfo] = useState("Detecting location...");
  const [weatherInfo, setWeatherInfo] = useState("Loading weather...");
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Failed to fetch IP address:', error);
        setIpAddress('Unable to fetch IP');
      }
    };

    const fetchLocationAndWeather = async () => {
      try {
        const { location, weather } = await getCurrentLocationAndWeather();
        setLocationInfo(location);
        setWeatherInfo(weather);
      } catch (error) {
        console.error('Failed to fetch location and weather:', error);
        setLocationInfo('Location unavailable');
        setWeatherInfo('Weather unavailable');
      }
    };

    fetchIpAddress();
    fetchLocationAndWeather();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || "";
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const formattedDate = currentDate.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex flex-col">
        <div className="flex items-center justify-between text-xs text-muted-foreground py-1 flex-wrap gap-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{formattedDate} | {formattedTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>{locationInfo}</span>
            <CloudSun className="h-3 w-3 ml-2" />
            <span>{weatherInfo}</span>
          </div>
          
          <div>IP: {ipAddress}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-poppins font-bold text-primary">
            Rajan Prakash Chand
          </a>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${
                  activeSection === link.href.substring(1) ? "active" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Contact me"
              asChild
            >
              <a href="mailto:rajanchand48@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Message me"
              asChild
            >
              <a href="#contact">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Schedule meeting"
              asChild
            >
              <a href="https://calendly.com/rajanchand48/1" target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5" />
              </a>
            </Button>
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-lg py-2 border-b border-border ${
                    activeSection === link.href.substring(1)
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
