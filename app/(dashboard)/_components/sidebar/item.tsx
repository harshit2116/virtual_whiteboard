"use client";

import Image from "next/image";
import {
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
};

export const Item = ({
  id,
  name,
  imageUrl,
}: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative group">
      <Hint
        label={name}
        side="right"
        align="start"
        sideOffset={18}
      >
        <button
          onClick={onClick}
          className={cn(
            "w-full h-full rounded-xl overflow-hidden transition-all duration-300 border-2 relative",
            isActive 
              ? "border-blue-400 shadow-lg shadow-blue-500/30 scale-110" 
              : "border-white/20 hover:border-white/40 hover:scale-105 opacity-75 hover:opacity-100"
          )}
        >
          <Image
            fill
            alt={name}
            src={imageUrl}
            className="object-cover"
          />
          {isActive && (
            <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px]"></div>
          )}
          {isActive && (
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          )}
        </button>
      </Hint>
    </div>
  );
};
