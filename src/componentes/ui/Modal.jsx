import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ aberto, aoFechar, titulo, children, tamanho = "md" }) {
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  if (!aberto) return null;

  const tamanhos = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={aoFechar}
      />

      {/* Conteúdo */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${tamanhos[tamanho]} max-h-[90vh] flex flex-col`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
          <button
            onClick={aoFechar}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo com scroll */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}