"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Debug: Log when component mounts
    console.log("PWA Install Prompt component mounted");

    const handler = (e: Event) => {
      console.log("beforeinstallprompt event fired!", e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
      setIsInstallable(true);
    };

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("App is already installed");
      setShowInstallPrompt(false);
    } else {
      console.log("App is not installed, waiting for install prompt...");
      // Force show after 3 seconds for testing
      setTimeout(() => {
        if (!deferredPrompt) {
          console.log("No install prompt detected, showing manual prompt");
          setShowInstallPrompt(true);
        }
      }, 3000);
    }

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Manual installation instructions
      alert("To install this app:\n\n" + 
            "Chrome: Tap menu (⋮) → 'Add to Home screen'\n" +
            "Safari: Tap share (□) → 'Add to Home Screen'\n" +
            "Firefox: Tap menu (⋮) → 'Install'\n" +
            "Edge: Tap menu (⋯) → 'Add to phone'");
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log("Install prompt result:", outcome);
      
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">W</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">
            Install Virtual Whiteboard
          </h3>
          <p className="text-sm text-gray-500">
            {isInstallable 
              ? "Add to your home screen for quick access" 
              : "Use browser menu to install this app"}
          </p>
        </div>
      </div>
      <div className="mt-3 flex space-x-2">
        <Button
          onClick={handleInstallClick}
          className="flex-1 bg-black hover:bg-gray-800 text-white"
          size="sm"
        >
          {isInstallable ? "Install" : "How to Install"}
        </Button>
        <Button
          onClick={handleDismiss}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          Later
        </Button>
      </div>
    </div>
  );
};
