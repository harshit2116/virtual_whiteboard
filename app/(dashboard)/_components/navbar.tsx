"use client";

import { useState } from "react";
import { 
  UserButton, 
  OrganizationSwitcher, 
  useOrganization
} from "@clerk/nextjs";
import { Bell, BellOff } from "lucide-react";

import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { organization } = useOrganization();
  const [notificationsMuted, setNotificationsMuted] = useState(false);

  const toggleNotifications = () => {
    setNotificationsMuted(!notificationsMuted);
  };
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-b border-white/20"></div>
        <div className="relative z-10 flex items-center gap-x-6 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-semibold">Online</span>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1">
          <SearchInput />
        </div>
        
        <div className="block lg:hidden flex-1">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "376px",
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
                }
              }
            }}
          />
        </div>        <div className="flex items-center gap-x-3">
          {organization && (
            <InviteButton />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNotifications}
            className={`text-white/70 hover:text-white hover:bg-white/20 p-3 rounded-full border border-white/20 transition-all duration-300 ${
              notificationsMuted ? 'bg-red-500/20 border-red-400/30' : ''
            }`}
          >
            {notificationsMuted ? (
              <BellOff className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 animate-pulse"></div>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "relative z-10",
                  userButtonTrigger: "rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg"
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
