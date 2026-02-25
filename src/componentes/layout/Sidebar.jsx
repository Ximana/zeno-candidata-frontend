"use client";

import { Users, Briefcase, FileText, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const menus = [
  { label: "Dashboard", icone: LayoutDashboard, href: "/" },
  { label: "Candidatos", icone: Users, href: "/candidatos" },
  { label: "Vagas", icone: Briefcase, href: "/vagas" },
  { label: "Candidaturas", icone: FileText, href: "/candidaturas" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { aberta, fechar } = useSidebar();

  return (
    <>
      {/* Overlay escuro, aparece no mobile quando a sidebar está aberta */}
      {aberta && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={fechar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-[#006B4F] z-30 flex flex-col
          transition-transform duration-300
          ${aberta ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:z-auto lg:h-full lg:shrink-0
        `}
      >
        {/* Logo + botão fechar (só no mobile) */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Users size={18} className="text-[#006B4F]" />
            </div>
            <span className="text-white font-bold text-lg">RecrutaApp</span>
          </div>

          <button
            onClick={fechar}
            className="lg:hidden text-white/70 hover:text-white p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links de navegação */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {menus.map((item) => {
            const activo = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={fechar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activo
                    ? "bg-white text-[#006B4F]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icone size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/40 text-xs">© 2024 RecrutaApp</p>
        </div>
      </aside>
    </>
  );
}