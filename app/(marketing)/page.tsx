import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins, Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const textRobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});
const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex ite  border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full upperclass">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>

        <div
          className={cn(
            "text-3xl md:text-6xl bg-gradient-to-t from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md",
            textRobotoFont.className
          )}
        >
          Work Foward
        </div>
      </div>

      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, Manage Project, and reach new productivity peaks. From high
        rises to home office, the way yout team works is unique - accomplish it
        all with Taskify.
      </div>

      <div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Get Taskify for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
