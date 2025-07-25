"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";

import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-4 right-4 bg-slate-900/80 backdrop-blur-xl rounded-xl p-3 flex items-center shadow-2xl border border-slate-600/30">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS)
          .map(({ connectionId, info }) => {
            return (
              <UserAvatar
                borderColor={connectionIdToColor(connectionId)}
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
              />
            )
        })}
        
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-4 right-4 bg-slate-900/80 backdrop-blur-xl rounded-xl p-3 flex items-center shadow-2xl border border-slate-600/30 w-[120px] animate-pulse">
      <div className="flex gap-x-2">
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};
