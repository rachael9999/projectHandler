import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins, Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import "./main.css";

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
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Streamline helps team
        </h1>
        <div
          className={cn(
            "text-3xl md:text-6xl bg-gradient-to-t from-fuchsia-400 to-blue-500 text-white px-4 p-2 rounded-md",
            textRobotoFont.className
          )}
        >
          Work Foward
        </div>
        <div>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/sign-up">Get Streamline for free</Link>
          </Button>
        </div>

        <div className="my-8 w-full">
          <video src={"./Boards.mp4"} controls className="w-full h-auto" />
        </div>
      </div>

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
      <article className="my-8 flex flex-col md:flex-row md:items-center">
        <div
          className={cn(
            "text-2xl md:text-xl sm:text-xs text-neutral-400 mt-4 md:mt-0 md:mr-8 max-w-xs md:max-w-md mx-auto md:text-left",
            textFont.className
          )}
        >
          <ul className="list-disc list-inside mt-4">
            <li>
              <b>Members: </b>Keep everyone accountable and never have to ask
              “who’s doing that” by adding members to cards for their projects
              and tasks.
            </li>
            <li>
              <b>Due dates: </b>They're easy to set, hard to miss (with
              reminders!), and oh-so-satisfying to mark as “done.”
            </li>
            <li>
              <b>Attachments: </b>No more digging through endless email chains
              to find attachments. Just drag and drop them onto a card so the
              right files stay with the right tasks.
            </li>
            <li>
              <b>Checklists:</b>Your best tool to overpower overwhelming asks.
              Break big tasks into small ones, check things off the list, and
              watch that status bar go to 100% complete.
            </li>
          </ul>
        </div>
        <img
          src={"./board.jpeg"}
          alt="Board"
          className="fade-in md:max-w-xl mx-auto mt-4 md:mt-0"
        />
      </article>
    </div>
  );
};

export default MarketingPage;
