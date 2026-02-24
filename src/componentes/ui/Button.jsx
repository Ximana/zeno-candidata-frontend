export default function Botao({
  children,
  onClick,
  tipo = "button",
  variante = "primario",
  tamanho = "md",
  desabilitado = false,
  className = "",
}) {
  const base =
    "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantes = {
    primario:
      "bg-[#006B4F] text-white hover:bg-[#005a40] focus:ring-[#006B4F]",
    secundario:
      "bg-white text-[#006B4F] border border-[#006B4F] hover:bg-[#f0faf6] focus:ring-[#006B4F]",
    perigo:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    fantasma:
      "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
  };

  const tamanhos = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={desabilitado}
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho]} ${
        desabilitado ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}