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
  });  if (data === undefined) {
    return (
      <div className="space-y-8 mt-12">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10">
                {query.favorites ? (
                  <Star className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Layers className="w-6 h-6 text-blue-400" />
                )}
              </div>              <div>
                <h2 className="text-3xl font-bold text-black drop-shadow-sm">
                  {query.favorites ? "Favorite Boards" : "Team Boards"}
                </h2>
                <p className="text-slate-700/90 mt-1 font-medium">
                  {query.favorites ? "Your starred boards" : "Collaborative workspace boards"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-500/40">
              <Clock className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-200 font-medium">Loading...</span>            </div>
          </div>
          
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
    <div className="space-y-8 mt-12">
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10">
              {query.favorites ? (
                <Star className="w-6 h-6 text-yellow-400" />
              ) : (
                <Layers className="w-6 h-6 text-blue-400" />
              )}
            </div>            <div>
              <h2 className="text-3xl font-bold text-black drop-shadow-sm">
                {query.favorites ? "Favorite Boards" : "Team Boards"}
              </h2>
              <p className="text-slate-700/90 mt-1 font-medium">
                {query.favorites ? "Your starred boards" : "Collaborative workspace boards"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-500/40">
            <Clock className="w-4 h-4 text-slate-300" />
            <span className="text-sm text-slate-200 font-medium">{data?.length || 0} boards</span>
          </div>        </div>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-sm"></div></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
