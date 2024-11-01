

import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins, Roboto } from "next/font/google";
import Carousel from "./carousel"; 
import "./carousel.css";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const textRobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

const images = [
  { src: "/photo/workspace.png", alt: "Workspace" },
  { src: "/photo/User%20Story%20.png", alt: "User Story" },
  { src: "/photo/calendar.png", alt: "Calendar View" },
  { src: "/photo/gantt%20chart.png", alt: "Gantt Chart" },
  { src: "/photo/importance.png", alt: "Importance View" },
  
];

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Streamline helps team
        </h1>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Get Streamline for free</Link>
        </Button>
        <div
        className={cn(
          "text-3xl md:text-2xl text-neutral-600 mt-8 max-w-xs md:max-w-2xl mx-auto ",
          textFont.className
        )}
      >
        <p>
          Collaborate, Manage Project, and reach new productivity peaks. From
          high rises to home office, the way your team works is unique -
          accomplish it all with Streamline.
        </p>
      </div>
      </div>
      <Carousel images={images} />


    </div>
  );
};

export default MarketingPage;