"use client";

import { Menu, Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="flex h-16 items-center justify-between px-4 bg-zinc-900 text-white border-b border-zinc-800">
      {/* Left: Hamburger */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-400"
          onClick={onToggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6 text-gray-400" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="ghost" size="icon">
          <User className="h-6 w-6 text-gray-400" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
}