import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/componentes/layout/Sidebar";
import { SidebarProvider } from "@/componentes/layout/SidebarContext";

export const metadata = {
  title: "RecrutaApp",
  description: "Sistema de gestão de candidatos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        {/* O SidebarProvider envolve tudo para partilhar o estado da sidebar */}
        <SidebarProvider>
          {/* h-screen + overflow-hidden no pai para a sidebar ficar presa na altura do ecrã */}
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            {/* O main tem overflow-y-auto para o conteúdo fazer scroll, não a página toda */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              {children}
            </main>
          </div>
        </SidebarProvider>
        <ToastContainer />
      </body>
    </html>
  );
}