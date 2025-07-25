import Image from "next/image";
import { Star } from "lucide-react";

export const EmptyFavorites = () => {  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 px-4">
      <div className="relative">
        <div className="flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/20">
          <Star className="w-16 h-16 text-yellow-400" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-400/10 blur-xl -z-10"></div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
          No Favorite Boards
        </h2>
        <p className="text-slate-300/80 text-lg">
          Star your favorite boards to find them quickly here
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};
