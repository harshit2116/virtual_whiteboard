"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrgSidebar } from "./org-sidebar";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="lg:hidden text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full border border-white/20 transition-all duration-300"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[320px] bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full border border-white/20 mb-4"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-4">
          <OrgSidebar />
        </div>
      </div>
    </>
  );
};
