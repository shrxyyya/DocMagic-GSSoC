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
        "overflow-hidden transition-all hover:shadow-lg group mx-[1.5%]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <CardHeader className="relative z-10">
         <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-32 rounded-md bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">Preview</span>
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Button asChild className="w-full">
          <Link href={href}>Create Now.</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}