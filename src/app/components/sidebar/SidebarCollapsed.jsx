"use client";

import {
  Home,
  Gift,
  LayoutGrid,
  AlignJustify,
  Users,
  Lightbulb,
  Settings,
} from "lucide-react";

function SidebarIcon({ icon: Icon, label, isActive = false }) {
  const iconColorClass = isActive
    ? "text-blue-400"
    : "text-gray-400 group-hover:text-gray-200";
  const bgColorClass = isActive ? "bg-[#1E293B]" : "group-hover:bg-gray-800";

  return (
    <div className="group relative flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 cursor-pointer">
      <div className={`flex items-center justify-center w-full h-full rounded-lg ${bgColorClass}`}>
        <Icon className={`w-6 h-6 ${iconColorClass}`} />
      </div>
      <span className="absolute left-14 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function SidebarCollapsed() {
  return (
    <div className="flex flex-col items-center w-full h-full py-4">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <nav className="flex flex-col items-center space-y-6 flex-grow">
        <SidebarIcon icon={Home} label="Home" />
        <SidebarIcon icon={Gift} label="Gifts" />
        <SidebarIcon icon={LayoutGrid} label="Dashboard" />
        <SidebarIcon icon={AlignJustify} label="Menu" />
        <SidebarIcon icon={Users} label="Users" />
        <SidebarIcon icon={Lightbulb} label="Ideas" />
      </nav>

      <div className="flex flex-col items-center space-y-6 mt-auto mb-2">
        <SidebarIcon icon={Settings} label="Settings" />
        <div className="relative">
          <img
            src="/user.png"
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-950"></span>
        </div>
      </div>
    </div>
  );
}



