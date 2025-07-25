import Image from "next/image";
import { Search } from "lucide-react";

export const EmptySearch = () => {  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 px-4">
      <div className="relative">
        <div className="flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/30">
          <Search className="w-16 h-16 text-slate-400" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-600/10 blur-xl -z-10"></div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
          No Results Found
        </h2>
        <p className="text-slate-300/80 text-lg">
          Try adjusting your search terms or browse all boards
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-slate-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-slate-400/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-slate-400/30 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};
