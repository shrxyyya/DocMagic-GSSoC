import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

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
        "overflow-hidden transition-all duration-300 hover:shadow-2xl group relative border-0 shadow-lg",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-700/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-4">
        <div className="h-32 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-purple-900/20 transition-all duration-300">
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">AI Preview</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button asChild className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href={href} className="flex items-center justify-center gap-2">
            Create Now
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}