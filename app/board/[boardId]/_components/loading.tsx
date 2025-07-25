import { Loader } from "lucide-react";

import { InfoSkeleton } from "./info";
import { ToolbarSkeleton } from "./toolbar";
import { ParticipantsSkeleton } from "./participants";

export const Loading = () => {
  return (
    <main
      className="h-full w-full relative bg-gradient-to-br from-slate-50 via-white to-slate-100 touch-none flex items-center justify-center"
    >
      <div className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-xl rounded-xl px-6 py-3 shadow-2xl border border-slate-600/30">
        <Loader className="h-5 w-5 text-blue-400 animate-spin" />
        <span className="text-white font-medium">Loading board...</span>
      </div>
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
 