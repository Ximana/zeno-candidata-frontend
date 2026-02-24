export default function Badge({ texto, cor = "verde" }) {
  const cores = {
    verde: "bg-emerald-100 text-emerald-700",
    amarelo: "bg-yellow-100 text-yellow-700",
    vermelho: "bg-red-100 text-red-700",
    azul: "bg-blue-100 text-blue-700",
    cinza: "bg-gray-100 text-gray-600",
    roxo: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cores[cor]}`}
    >
      {texto}
    </span>
  );
}