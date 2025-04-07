
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <h3 className="text-2xl font-semibold">Send Me a Message</h3>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
          
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
