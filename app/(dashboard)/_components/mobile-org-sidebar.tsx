"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { LayoutDashboard, Star, Sparkles, Zap, X } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

interface MobileOrgSidebarProps {
  onClose: () => void;
}

export const MobileOrgSidebar = ({ onClose }: MobileOrgSidebarProps) => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900">

      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h2 className="text-white font-semibold text-lg">Menu</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        
        <Link href="/" onClick={onClose} className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-sm opacity-75"></div>
                <Image
                  src="/logo.png"
                  alt="Takhta Logo"
                  height={48}
                  width={48}
                  className="relative z-10 rounded-2xl"
                />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-black text-xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent",
                  font.className,
                )}>
                  Takhta
                </span>
                <span className="text-white/70 text-sm font-semibold">
                  Virtual Whiteboard
                </span>
              </div>
            </div>
          </div>
        </Link>
        
      
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                },
                organizationSwitcherTrigger: {
                  padding: "12px 16px",
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }
                }
              }
            }}
          />
        </div>

     
        <div className="space-y-3">
    
          <Button
            variant="ghost"
            asChild
            className="w-full h-auto p-0 hover:bg-transparent"
          >
            <Link 
              href="/"
              onClick={onClose}
            >
              <div className={cn(
                "w-full p-4 rounded-2xl border transition-all duration-300",
                !favorites 
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 shadow-lg shadow-blue-500/20" 
                  : "bg-white/5 border-white/20 hover:bg-white/10"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    !favorites 
                      ? "bg-blue-500 shadow-lg shadow-blue-500/30" 
                      : "bg-white/20"
                  )}>
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-base">Team Boards</p>
                    <p className="text-white/70 text-sm">Collaborate with your team</p>
                  </div>
                </div>
              </div>
            </Link>
          </Button>

        
          <Button
            variant="ghost"
            asChild
            className="w-full h-auto p-0 hover:bg-transparent"
          >
            <Link 
              href={{
                pathname: "/",
                query: { favorites: "true" }
              }}
              onClick={onClose}
            >
              <div className={cn(
                "w-full p-4 rounded-2xl border transition-all duration-300",
                favorites 
                  ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30 shadow-lg shadow-amber-500/20" 
                  : "bg-white/5 border-white/20 hover:bg-white/10"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    favorites 
                      ? "bg-amber-500 shadow-lg shadow-amber-500/30" 
                      : "bg-white/20"
                  )}>
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-base">Favorites</p>
                    <p className="text-white/70 text-sm">Your starred boards</p>
                  </div>
                </div>
              </div>
            </Link>
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">System Status</p>
              <p className="text-green-300 text-sm">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
