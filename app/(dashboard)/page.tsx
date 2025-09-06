"use client";

import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { BarChart3, Users, Clock, TrendingUp, Zap, Target, Globe, Activity } from "lucide-react";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { api } from "@/convex/_generated/api";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const DashboardPage = ({
  searchParams,
}: DashboardPageProps) => {
  const { organization } = useOrganization();

  const boards = useQuery(api.boards.get, 
    organization?.id ? { orgId: organization.id } : "skip"
  );
  
  const activeBoardCount = boards?.length || 0;
  const teamMemberCount = organization?.membersCount || 0;

  return (    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {organization && (
        <>  
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-30">
              <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
                <defs>
                  <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)"/>
              </svg>
            </div>
            
            <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-6 sm:mb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                      <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2">
                        Command Center
                      </h1>
                      <p className="text-blue-100 text-sm sm:text-lg font-medium">
                        Your digital workspace at a glance
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:hidden items-center space-x-6 w-full justify-center">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold">{activeBoardCount}</p>
                    <p className="text-blue-200 text-xs sm:text-sm">Active Projects</p>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold">{teamMemberCount}</p>
                    <p className="text-blue-200 text-xs sm:text-sm">Collaborators</p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold">{activeBoardCount}</p>
                    <p className="text-blue-200 text-sm">Active Projects</p>
                  </div>
                  <div className="w-px h-12 bg-white/30"></div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{teamMemberCount}</p>
                    <p className="text-blue-200 text-sm">Collaborators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 -mt-4 sm:-mt-6 relative z-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-3xl font-black text-slate-900 mb-1">{activeBoardCount}</p>
                      <p className="text-slate-600 font-semibold text-xs sm:text-base">Active Boards</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-blue-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <BarChart3 className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-center text-green-600">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">Live data</span>
                  </div>
                </div>
              </div>              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-3xl font-black text-slate-900 mb-1">{teamMemberCount}</p>
                      <p className="text-slate-600 font-semibold text-xs sm:text-base">Team Members</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-emerald-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <Users className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-center text-green-600">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">From organization</span>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-3xl font-black text-slate-900 mb-1">2.4h</p>
                      <p className="text-slate-600 font-semibold text-xs sm:text-base">Avg Session</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-amber-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <Clock className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-center text-amber-600">
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">Demo data</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-3xl font-black text-slate-900 mb-1">+23%</p>
                      <p className="text-slate-600 font-semibold text-xs sm:text-base">Productivity</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-purple-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <Activity className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-center text-purple-600">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">Demo trend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>          <div className="px-4 sm:px-6 mt-8 sm:mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/50 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 sm:mb-2">Your Workspace</h2>
                  <p className="text-slate-600 text-sm sm:text-base">Manage and collaborate on your projects</p>
                </div>
                <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-sm">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}      <div className="px-4 sm:px-6 pb-8">
        {!organization ? (
          <EmptyOrg />
        ) : (
          <BoardList
            orgId={organization.id}
            query={searchParams}
          />
        )}
      </div>
    </div>
   );
};
 
export default DashboardPage;