"use client";

import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import SidebarCollapsed from "./components/sidebar/SidebarCollapsed";
import SidebarExpanded from "./components/sidebar/SidebarExpanded";

const DashboardLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-gray-100">
      {/* SidebarCollapsed (always on desktop) */}
      <div className="hidden sm:flex fixed top-0 left-0 w-20 h-full z-50 bg-gray-900">
        <SidebarCollapsed />
      </div>

      {/* SidebarExpanded (slides beside collapsed) */}
      {isSidebarExpanded && (
        <div
          className={`
            fixed top-0 h-full z-50 bg-zinc-900 transition-all duration-300
            ${isSidebarExpanded ? "w-64" : "w-0 overflow-hidden"}
            ${isSidebarExpanded ? "left-0 sm:left-20" : "left-0 sm:left-20"}
          `}
        >
          <SidebarExpanded onClose={toggleSidebar} />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 h-full w-full transition-all duration-300 ${
          isSidebarExpanded ? "ml-0 sm:ml-[20rem]" : "ml-0 sm:ml-20"
        }`}
      >
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

