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
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  gradient?: string;
}

export function DocumentCard({
  title,
  description,
  icon,
  href,
  className,
  gradient = "from-blue-500 to-purple-500",
}: DocumentCardProps) {
  return (
    <div className={cn("group", className)}>
      <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:scale-105 hover:-translate-y-2 h-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 dark:from-gray-800/60 dark:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glowing border effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-gray-700/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <CardHeader className="relative z-10 pb-4 lg:pb-6">
          <div className={`h-14 w-14 lg:h-18 lg:w-18 rounded-xl lg:rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
            {icon}
          </div>
          <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors duration-300 font-bold">{title}</CardTitle>
          <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed text-sm lg:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 pb-4 lg:pb-6">
          <div className={`h-32 lg:h-40 rounded-xl lg:rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-purple-900/20 transition-all duration-500 shadow-inner`}>
            <div className="flex items-center gap-2 lg:gap-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 group-hover:animate-spin" />
              <span className="font-bold text-sm lg:text-lg">AI Preview</span>
              <Zap className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-125 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10">
          <Button asChild className={`w-full group/btn bg-gradient-to-r ${gradient} hover:shadow-xl border-0 shadow-lg transition-all duration-500 hover:scale-105 text-base lg:text-lg font-bold py-4 lg:py-6 rounded-xl lg:rounded-2xl`}>
            <Link href={href} className="flex items-center justify-center gap-2 lg:gap-3">
              Create Now
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover/btn:translate-x-2 group-hover/btn:scale-125 transition-all duration-300" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}