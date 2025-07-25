"use client";

import { toast } from "sonner";
import { Plus, Loader2, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
};

export const NewBoardButton = ({
  orgId,
  disabled,
}: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Neural Board"
    })
      .then((id) => {
        toast.success("🚀 Board created successfully!");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("❌ Failed to create board"));
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] rounded-3xl flex flex-col items-center justify-center py-6 relative overflow-hidden group transition-all duration-500 hover:scale-105",
        (pending || disabled) && "opacity-75 hover:scale-100 cursor-not-allowed"
      )}    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-[2px] opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl"></div>      </div>

      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity">
        <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-60 transition-opacity">
        <Zap className="h-5 w-5 text-blue-300 animate-pulse" />      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 group-hover:bg-white/30 transition-all duration-300">
            {pending ? (
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            ) : (
              <Plus className="h-12 w-12 text-white group-hover:rotate-90 transition-transform duration-500" />
            )}
          </div>
        </div>        
        <div className="text-center space-y-2">
          <p className="text-xl font-black text-white mb-1">
            {pending ? "Creating Magic..." : "Create Board"}
          </p>
          <p className="text-white/70 text-sm font-semibold">
            {pending ? "Initializing workspace" : "Start your next masterpiece"}
          </p>
        </div>      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>
    </button>
  );
};
