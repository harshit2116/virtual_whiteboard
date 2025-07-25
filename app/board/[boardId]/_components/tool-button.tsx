"use client";

import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        className={`
          w-10 h-10 rounded-lg transition-all duration-200
          ${isActive 
            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/50" 
            : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/30"
          }
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <Icon className="w-5 h-5" />
      </Button>
    </Hint>
  );
};
