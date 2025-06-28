import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
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
        "overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 group border-0 glass-effect",
        className
      )}
    >
      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        gradient
      )} />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-gradient" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className={cn(
          "h-14 w-14 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
          gradient
        )}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-yellow-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-4">
        <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">AI Preview</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button 
          asChild 
          className={cn(
            "w-full bg-gradient-to-r text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg",
            gradient
          )}
        >
          <Link href={href} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Create Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}