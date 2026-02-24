import { Eye, Pencil, Trash2, MapPin, Briefcase } from "lucide-react";
import { iniciais } from "@/utils/helpers";

export default function CardCandidato({ candidato, aoVer, aoEditar, aoRemover }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-4">
      {/* Topo: foto + nome */}
      <div className="flex items-center gap-3">
        {candidato.foto ? (
          <img
            src={candidato.foto}
            alt={candidato.nomeCompleto}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#006B4F]/20"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#006B4F] text-white flex items-center justify-center font-bold text-sm">
            {iniciais(candidato.nomeCompleto)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{candidato.nomeCompleto}</p>
          <p className="text-xs text-gray-400 truncate">{candidato.email}</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#006B4F]" />
          <span>{candidato.provincia}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={14} className="text-[#006B4F]" />
          <span>
            {candidato.anosExperienciaInt}{" "}
            {candidato.anosExperienciaInt === 1 ? "ano" : "anos"} de experiência
          </span>
        </div>
      </div>

      {/* Rodapé: acções */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
        <button
          onClick={() => aoVer(candidato)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-[#006B4F] hover:bg-[#006B4F]/10 rounded-lg transition-colors"
        >
          <Eye size={14} />
          Ver
        </button>
        <button
          onClick={() => aoEditar(candidato)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Pencil size={14} />
          Editar
        </button>
        <button
          onClick={() => aoRemover(candidato.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={14} />
          Remover
        </button>
      </div>
    </div>
  );
}