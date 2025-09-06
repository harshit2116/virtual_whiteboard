"use client";

import { useQuery } from "convex/react";
import { Layers, Clock, Star } from "lucide-react";

import { api } from "@/convex/_generated/api";

import { BoardCard } from "./board-card";
import { EmptySearch } from "./empty-search";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

export const BoardList = ({
  orgId,
  query,
}: BoardListProps) => {
  const data = useQuery(api.boards.get, { 
    orgId,
    ...query,
  });  if (data === undefined) {    return (
      <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-12">
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10">
                {query.favorites ? (
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                ) : (
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-black drop-shadow-sm">
                  {query.favorites ? "Favorite Boards" : "Team Boards"}
                </h2>
                <p className="text-slate-700/90 mt-1 font-medium text-sm sm:text-base">
                  {query.favorites ? "Your starred boards" : "Collaborative workspace boards"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-500/40">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
              <span className="text-xs sm:text-sm text-slate-200 font-medium">Loading...</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-sm"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data?.length) {
    return <EmptyBoards />
  }  return (
    <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-12">
      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10">
              {query.favorites ? (
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              ) : (
                <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-black drop-shadow-sm">
                {query.favorites ? "Favorite Boards" : "Team Boards"}
              </h2>
              <p className="text-slate-700/90 mt-1 font-medium text-sm sm:text-base">
                {query.favorites ? "Your starred boards" : "Collaborative workspace boards"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-500/40">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
            <span className="text-xs sm:text-sm text-slate-200 font-medium">{data?.length || 0} boards</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-sm"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
