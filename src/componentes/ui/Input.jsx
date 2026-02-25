export default function Input({
  label,
  nome,
  tipo = "text",
  valor,
  aoMudar,
  placeholder = "",
  erro = "",
  obrigatorio = false,
  desabilitado = false,
  className = "",
  ...resto
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={nome} className="text-sm font-medium text-gray-700">
          {label}
          {obrigatorio && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={nome}
        name={nome}
        type={tipo}
        value={valor}
        onChange={aoMudar}
        placeholder={placeholder}
        disabled={desabilitado} 
        className={`px-3 py-2 border rounded-lg text-sm bg-white text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent 
          transition-all duration-200 placeholder:text-gray-400
          ${desabilitado ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
          ${erro ? "border-red-400" : "border-gray-300"}`}
        {...resto}
      />
      {erro && <p className="text-xs text-red-500">{erro}</p>}
    </div>
  );
}
