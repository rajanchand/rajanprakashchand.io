
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <ContactInfoCard 
        icon={<Phone className="h-5 w-5 text-primary" />}
        title="Phone"
        content={
          <a 
            href="tel:+447570731478" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            +44 7570 731478
          </a>
        }
      />
      
      <ContactInfoCard 
        icon={<Mail className="h-5 w-5 text-primary" />}
        title="Email"
        content={
          <a 
            href="mailto:rajanchand48@gmail.com" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            rajanchand48@gmail.com
          </a>
        }
      />
      
      <ContactInfoCard 
        icon={<MapPin className="h-5 w-5 text-primary" />}
        title="Location"
        content={
          <p className="text-muted-foreground">
            Paisley, Scotland, United Kingdom
          </p>
        }
      />
      
      <div className="mt-6 aspect-w-16 aspect-h-9 h-48 w-full rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35914.63345224767!2d-4.456324!3d55.8447515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488848038f79dce5%3A0x51294fbe96602643!2sPaisley%2C%20UK!5e0!3m2!1sen!2sus!4v1617472274352!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Maps"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function ContactInfoCard({ icon, title, content }: ContactInfoCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            {content}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
