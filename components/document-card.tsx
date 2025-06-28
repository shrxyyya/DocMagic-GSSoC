import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  className?: string;
}

export function DocumentCard({
  title,
  description,
  icon,
  href,
  gradient,
  className,
}: DocumentCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 group border-0 glass-card relative",
        className
      )}
    >
      {/* Animated gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-all duration-500",
        gradient
      )} />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-gradient" />
      <div className="absolute inset-[1px] rounded-lg bg-background" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className={cn(
          "h-16 w-16 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden",
          gradient
        )}>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            {icon}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold group-hover:text-yellow-600 transition-colors duration-300 text-shadow">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-6">
        <div className="h-36 rounded-xl bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-all duration-300 border border-muted/50 group-hover:border-yellow-400/30">
          <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
            <Sparkles className="h-6 w-6 group-hover:text-yellow-500 group-hover:animate-pulse" />
            <span className="text-sm font-medium">AI Preview</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-current opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{transitionDelay: `${i * 100}ms`}}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button 
          asChild 
          className={cn(
            "w-full bg-gradient-to-r text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg group/btn relative overflow-hidden rounded-xl py-6",
            gradient
          )}
        >
          <Link href={href} className="flex items-center justify-center gap-3">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <Zap className="h-5 w-5 group-hover/btn:rotate-12 transition-transform relative z-10" />
            <span className="relative z-10">Create Now</span>
            <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}