import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-float" style={{animationDelay: '12s'}}></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            Loved by <span className="bolt-gradient-text">professionals everywhere</span>
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            See what our users are saying about how DocMagic has transformed their document creation process with AI magic.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="glass-effect border-0 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="ring-2 ring-yellow-400/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bolt-gradient text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold group-hover:text-yellow-600 transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-yellow-400/20" />
                <p className="text-muted-foreground relative z-10 italic">"{testimonial.content}"</p>
              </CardContent>
              
              <CardFooter className="pt-4">
                <div className="flex space-x-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Alex Johnson",
    title: "UX Designer",
    content: "DocMagic helped me create a stunning portfolio presentation in minutes. The AI understood exactly what I needed and generated slides that wowed my clients. Absolutely magical! ⚡",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Sarah Chen",
    title: "Software Engineer",
    content: "I was struggling with my resume for weeks. With DocMagic, I typed in my target role, and it created a tailored CV that highlighted my most relevant skills. I got the job! 🚀",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Michael Rodriguez",
    title: "Marketing Director",
    content: "The presentation templates are simply stunning. I used the platform to create our quarterly business review and received compliments from the entire executive team. Game changer! ✨",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];