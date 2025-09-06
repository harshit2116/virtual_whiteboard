import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import { Suspense } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { Loading } from "@/components/auth/loading";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Whiteboard",
  description: "Virtual Whiteboard is an interactive online platform that allows users to collaborate in real-time. It simulates the experience of using a physical whiteboard, but with the added benefits of digital tools",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Virtual Whiteboard",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Virtual Whiteboard" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />            {children}
            <PWAInstallPrompt />
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
