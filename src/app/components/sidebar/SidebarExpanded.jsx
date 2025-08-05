"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function SidebarExpanded({ onClose }) {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-zinc-900 text-white p-4 w-full overflow-y-auto">
      {/* Top */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-gray-400 text-xl tracking-wider">Dashboards</h4>
        <button onClick={onClose}>
          <ChevronLeft className="text-blue-400 w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="px-2">
        <ul className="space-y-1">
          {[
            { label: "Sales", href: "/" },
            { label: "CRM Analytics", href: "/crm" },
            { label: "Orders", href: "/orders" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium ${
                  pathname === href
                    ? "bg-zinc-800 text-blue-400"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
