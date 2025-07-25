"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled"
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 px-4">
      <div className="relative">
        <div className="flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/10">
          <Image
            src="/note.svg"
            height={80}
            width={80}
            alt="Empty"
            className="opacity-80"
          />        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-xl -z-10"></div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Create Your First Board
        </h2>
        <p className="text-slate-300/80 text-lg">
          Start collaborating with your team by creating a new whiteboard
        </p>      </div>

      <div className="pt-4">
        <Button 
          disabled={pending} 
          onClick={onClick} 
          size="lg"
          className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
        >
          {pending ? "Creating..." : "Create Board"}
          {!pending && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-lg -z-10"></div>
          )}        </Button>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};
