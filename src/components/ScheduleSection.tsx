
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function ScheduleSection() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const today = new Date();
  
  return (
    <section id="schedule" className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Schedule an Appointment</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="animate-slide-in-left">
            <Card className="overflow-hidden shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Select a Date & Time
                </CardTitle>
                <CardDescription>
                  Choose a convenient date from the calendar below. I'm available on weekdays from 9:00 AM to 5:00 PM.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => 
                          date < today || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <div className="w-full pt-4 flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">After selecting a date, please use one of the options below to schedule your appointment:</p>
                    <Button asChild variant="default" size="lg" className="w-full animate-pulse hover:animate-none">
                      <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-4 w-4" /> Open Calendly
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <a href="mailto:rajanchand48@gmail.com" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> Email Me
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-slide-in-right">
            <Card className="h-full shadow-lg border-primary/20 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Why Schedule a Meeting?
                </CardTitle>
                <CardDescription>
                  I'm available for various types of discussions and consultations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2 hover:bg-primary/5 transition-colors rounded">
                    <h3 className="font-medium text-lg">Technical Consultation</h3>
                    <p className="text-muted-foreground">Discuss technical challenges, network issues, or IT infrastructure questions.</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2 hover:bg-primary/5 transition-colors rounded">
                    <h3 className="font-medium text-lg">Professional Advice</h3>
                    <p className="text-muted-foreground">Seeking career guidance or professional development recommendations in the IT field.</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2 hover:bg-primary/5 transition-colors rounded">
                    <h3 className="font-medium text-lg">Project Collaboration</h3>
                    <p className="text-muted-foreground">Explore potential partnership opportunities or discuss project ideas.</p>
                  </div>
                
                <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm">
                    Please provide a brief description of the meeting purpose when scheduling through Calendly,email me or you can contact me. This helps me prepare better for our discussion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
