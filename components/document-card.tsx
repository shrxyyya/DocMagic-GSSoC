import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
  className?: string;
}

export function DocumentCard({
  title,
  description,
  icon,
  href,
  className,
}: DocumentCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 hover:shadow-2xl group relative border-0 glass-effect hover:scale-105",
        className
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bolt-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 shimmer"></div>
      </div>
      
      <CardHeader className="relative z-10 pb-4">
        <div className="h-14 w-14 rounded-xl bolt-gradient flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:bolt-gradient-text transition-all duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="h-32 rounded-lg bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center group-hover:from-yellow-50 group-hover:to-blue-50 transition-all duration-500 border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Sparkles className="h-5 w-5 group-hover:text-yellow-500 transition-colors" />
            <span className="font-medium">AI Preview</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button 
          asChild 
          className="w-full bolt-gradient text-white font-semibold hover:scale-105 transition-all duration-300 group-hover:bolt-glow"
        >
          <Link href={href} className="flex items-center justify-center gap-2">
            Create Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}