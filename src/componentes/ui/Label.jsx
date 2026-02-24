export default function Label({ children, htmlFor, obrigatorio = false, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {obrigatorio && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}