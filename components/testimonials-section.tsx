import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Star, Quote, Award, TrendingUp, Users, Zap } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 py-32 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '50s' }} />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl lg:text-center">
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-xl text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-primary/20">
            <Star className="h-5 w-5 fill-current" />
            Trusted by Industry Leaders
          </div>
          <h2 className="text-base font-semibold leading-7 text-primary mb-4">Testimonials</h2>
          <p className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Loved by Professionals
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </p>
          <p className="text-xl md:text-2xl leading-8 text-muted-foreground max-w-4xl mx-auto">
            See what our users are saying about how DocMagic has transformed their document creation process and accelerated their career success.
          </p>
        </div>
        
        {/* Enhanced testimonials grid with 3D effects */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="group perspective-1000">
              <Card className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-6 transform-gpu hover:rotate-x-3 hover:rotate-y-3 overflow-hidden">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-gray-700/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <CardHeader className="pb-6 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-4 ring-primary/20 shadow-xl">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</p>
                      <p className="text-muted-foreground font-medium">{testimonial.title}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <Quote className="absolute top-0 left-0 h-12 w-12 text-primary/20 -translate-x-4 -translate-y-4" />
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300 relative z-10 text-lg">
                    {testimonial.content}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0 relative z-10">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {testimonial.metric}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Enhanced stats section with 3D cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, number: "98%", label: "Success Rate", color: "from-green-500 to-emerald-500" },
            { icon: Star, number: "4.9/5", label: "Average Rating", color: "from-yellow-500 to-orange-500" },
            { icon: Users, number: "50K+", label: "Documents Created", color: "from-blue-500 to-cyan-500" },
            { icon: Zap, number: "24/7", label: "AI Availability", color: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${stat.color} opacity-20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`} />
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium text-lg">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Alexandra Johnson",
    title: "Senior UX Designer",
    company: "TechCorp Inc.",
    content: "DocMagic completely revolutionized my workflow. I created a stunning portfolio presentation in minutes that landed me three new clients. The AI understands design principles better than most humans!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    metric: "3x more clients"
  },
  {
    name: "Sarah Chen",
    title: "Software Engineer",
    company: "StartupXYZ",
    content: "I was struggling with my resume for weeks. DocMagic created a tailored CV that highlighted my most relevant skills perfectly. I got the job within a week and a 40% salary increase!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    metric: "40% salary boost"
  },
  {
    name: "Michael Rodriguez",
    title: "Marketing Director",
    company: "Global Solutions",
    content: "The presentation templates are absolutely stunning. I used DocMagic for our quarterly business review and received standing ovation from the board. This tool is pure magic!",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
    metric: "Standing ovation"
  }
];