"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};

export const Info = ({
  boardId,
}: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;
  return (
    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xl rounded-xl px-4 h-12 flex items-center shadow-2xl border border-slate-600/30">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="ghost" className="px-3 hover:bg-slate-700/50 text-white">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-2">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className={cn(
              "font-semibold text-lg text-white",
              font.className,
            )}>
              Takhta
            </span>
          </Link>
        </Button>
      </Hint>
      <div className="text-slate-400 px-2">|</div>
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="ghost"
          className="text-base font-normal px-3 text-white hover:bg-slate-700/50"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <div className="text-slate-400 px-2">|</div>
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost" className="text-white hover:bg-slate-700/50">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div 
      className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xl rounded-xl px-4 h-12 flex items-center shadow-2xl border border-slate-600/30 w-[300px] animate-pulse"
    >
      <div className="w-8 h-8 bg-slate-700 rounded-lg mr-2"></div>
      <div className="w-20 h-4 bg-slate-700 rounded mr-2"></div>
      <div className="text-slate-400 px-2">|</div>
      <div className="w-24 h-4 bg-slate-700 rounded mr-2"></div>
      <div className="text-slate-400 px-2">|</div>
      <div className="w-6 h-6 bg-slate-700 rounded"></div>
    </div>
  );
};
