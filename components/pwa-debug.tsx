"use client";

import { useEffect, useState } from "react";
import { usePWA } from "@/hooks/use-pwa";

export const PWADebug = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAppInstalled, displayMode, isOnline, isPWASupported } = usePWA();
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState("unknown");
  const [manifestStatus, setManifestStatus] = useState("unknown");

  useEffect(() => {
    // Check service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        setServiceWorkerStatus(reg ? "registered" : "not registered");
      });
    } else {
      setServiceWorkerStatus("not supported");
    }

    // Check manifest
    fetch('/manifest.json')
      .then(res => res.ok ? setManifestStatus("found") : setManifestStatus("not found"))
      .catch(() => setManifestStatus("error"));
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded text-xs z-50"
      >
        PWA Debug
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">PWA Debug Info</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500">×</button>
      </div>
      <div className="space-y-1">
        <div>App Installed: <span className={isAppInstalled ? "text-green-600" : "text-red-600"}>{isAppInstalled ? "Yes" : "No"}</span></div>
        <div>Display Mode: <span className="font-mono">{displayMode}</span></div>
        <div>Online: <span className={isOnline ? "text-green-600" : "text-red-600"}>{isOnline ? "Yes" : "No"}</span></div>
        <div>PWA Supported: <span className={isPWASupported ? "text-green-600" : "text-red-600"}>{isPWASupported ? "Yes" : "No"}</span></div>
        <div>Service Worker: <span className={serviceWorkerStatus === "registered" ? "text-green-600" : "text-red-600"}>{serviceWorkerStatus}</span></div>
        <div>Manifest: <span className={manifestStatus === "found" ? "text-green-600" : "text-red-600"}>{manifestStatus}</span></div>
        <div>User Agent: <span className="font-mono text-xs">{navigator.userAgent.split(' ').slice(-2).join(' ')}</span></div>
        <div>Protocol: <span className="font-mono">{window.location.protocol}</span></div>
        <div>Host: <span className="font-mono">{window.location.host}</span></div>
      </div>
    </div>
  );
};
