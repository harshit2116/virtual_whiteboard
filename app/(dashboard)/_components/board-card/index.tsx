"use client";

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal, Calendar, User, Star, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Footer } from "./footer";
import { Overlay } from "./overlay";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
};

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const {
    mutate: onFavorite,
    pending: pendingFavorite,
  } = useApiMutation(api.board.favorite);
  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite,
  } = useApiMutation(api.board.unfavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id })
        .catch(() => toast.error("Failed to unfavorite"))
    } else {
      onFavorite({ id, orgId })
        .catch(() => toast.error("Failed to favorite"))
    }
  };

  return (
    <div className="group relative aspect-[100/127] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
      <Link href={`/board/${id}`} className="block relative flex-1 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
          <Overlay />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white truncate">
              {title}
            </h3>
            
            <div className="flex items-center justify-between text-sm">              <div className="flex items-center space-x-2 text-slate-300">
                <User className="w-3 h-3" />
                <span>{authorLabel}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Calendar className="w-3 h-3" />
                <span>{createdAtLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                <ExternalLink className="w-3 h-3 text-blue-300" />
                <span className="text-xs text-blue-300 font-medium">Open Board</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-medium truncate">{title}</h3>
          <p className="text-slate-300 text-sm">{authorLabel}</p>
        </div>
      </Link>

      <button
        disabled={pendingFavorite || pendingUnfavorite}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite();
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 hover:border-yellow-400/50 transition-colors z-30"
      >        <Star
          className={`w-4 h-4 transition-colors ${
            isFavorite 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-slate-400 hover:text-yellow-400"
          }`}
        />
      </button>

      <Actions
        id={id}
        title={title}
        side="right"
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
          }}
          className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 hover:border-slate-400/50 z-10 relative"
        >
          <MoreHorizontal className="w-4 h-4 text-slate-300 hover:text-white transition-colors" />
        </button>
      </Actions>

      {isFavorite && (
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded-md bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-yellow-300 font-medium">Favorite</span>
        </div>
      )}
    </div>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-600/30 animate-pulse">
      <div className="h-full w-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 relative">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          <Skeleton className="h-4 w-3/4 bg-slate-600/50" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-1/3 bg-slate-600/50" />
            <Skeleton className="h-3 w-1/4 bg-slate-600/50" />
          </div>
        </div>
        
        <div className="absolute top-3 right-3">
          <Skeleton className="w-8 h-8 rounded-lg bg-slate-600/50" />
        </div>
      </div>
    </div>
  );
};
