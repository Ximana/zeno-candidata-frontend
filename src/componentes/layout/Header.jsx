"use client";

import { Bell, User, Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function Header({ titulo = "Dashboard" }) {
  const { alternar } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Botão hamburguer, só aparece em mobile */}
        <button
          onClick={alternar}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-lg font-semibold text-gray-700">{titulo}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#006B4F]/20 flex items-center justify-center">
          <User size={16} className="text-[#006B4F]" />
        </div>
      </div>
    </header>
  );
}
