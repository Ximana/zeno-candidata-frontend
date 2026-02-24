export default function Select({
  label,
  nome,
  valor,
  aoMudar,
  opcoes = [],
  placeholder = "Selecione...",
  erro = "",
  obrigatorio = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={nome} className="text-sm font-medium text-gray-700">
          {label}
          {obrigatorio && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={nome}
        name={nome}
        value={valor}
        onChange={aoMudar}
        className={`px-3 py-2 border rounded-lg text-sm bg-white text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent 
          transition-all duration-200 
          ${erro ? "border-red-400" : "border-gray-300"}`}
      >
        <option value="">{placeholder}</option>
        {opcoes.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      {erro && <p className="text-xs text-red-500">{erro}</p>}
    </div>
  );
}