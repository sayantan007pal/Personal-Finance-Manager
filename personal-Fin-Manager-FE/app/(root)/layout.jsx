"use client";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
}