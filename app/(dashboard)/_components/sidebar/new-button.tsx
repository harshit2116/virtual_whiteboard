"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square group">
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 border-2 border-dashed border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-sm group-hover:scale-105">
              <Plus className="text-white w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-900/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl"
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
