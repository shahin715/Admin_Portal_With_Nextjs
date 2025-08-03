"use client";
import { useState } from "react";
import SidebarCollapsed from "./components/sidebar/SidebarCollapsed";
import SidebarExpanded from "./components/sidebar/SidebarExpanded";
import Navbar from "./components/navbar/Navbar";

export default function DashboardLayout({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
 <div className="flex w-full min-h-screen bg-zinc-800 text-white relative overflow-x-hidden">
      {/* Icons-only column: always visible */}
      <div className="w-20">
        <SidebarCollapsed />
      </div>

      {/* Expanded menu column: toggles width and pushes content */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "w-44" : "w-0"}`}>
        {expanded && <SidebarExpanded onClose={() => setExpanded(false)} />}
      </div>

      {/* Main content + navbar */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar onToggleSidebar={() => setExpanded(!expanded)} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

