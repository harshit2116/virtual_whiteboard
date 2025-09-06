"use client";

import { useState } from "react";
import { 
  UserButton, 
  OrganizationSwitcher, 
  useOrganization
} from "@clerk/nextjs";
import { Bell, BellOff, Menu } from "lucide-react";

import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { Button } from "@/components/ui/button";
import { MobileOrgSidebar } from "./mobile-org-sidebar";
import { OrgSidebar } from "./org-sidebar";

export const Navbar = () => {
  const { organization } = useOrganization();
  const [notificationsMuted, setNotificationsMuted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsMuted(!notificationsMuted);
  };return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-b border-white/20"></div>        <div className="relative z-10 flex items-center gap-x-3 sm:gap-x-6 px-3 sm:px-6 py-3 sm:py-4">        <div className="flex items-center gap-2">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full border border-white/20 transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-semibold">Online</span>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1">
          <SearchInput />
        </div>
        
        <div className="block lg:hidden flex-1 mr-2">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "300px",
                },
                organizationSwitcherTrigger: {
                  padding: "8px 12px",
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }
              }
            }}
          />
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-3">
          {organization && (
            <div className="hidden sm:block">
              <InviteButton />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNotifications}
            className={`text-white/70 hover:text-white hover:bg-white/20 p-2 sm:p-3 rounded-full border border-white/20 transition-all duration-300 ${
              notificationsMuted ? 'bg-red-500/20 border-red-400/30' : ''
            }`}
          >
            {notificationsMuted ? (
              <BellOff className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 animate-pulse"></div>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "relative z-10",
                  userButtonTrigger: "rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg w-8 h-8 sm:w-10 sm:h-10"
                }
              }}
            />          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="lg:hidden fixed top-0 left-0 h-full w-[85vw] max-w-[320px] z-50 transform transition-transform duration-300">
            <MobileOrgSidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};
