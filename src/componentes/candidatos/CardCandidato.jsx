import { Eye, Pencil, Trash2, MapPin, Briefcase } from "lucide-react";
import { iniciais } from "@/utils/helpers";

export default function CardCandidato({ candidato, aoVer, aoEditar, aoRemover }) {
  const exp = candidato.anosExperienciaInt;
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {candidato.foto ? (
          <img src={candidato.foto} alt={candidato.nomeCompleto}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#006B4F]/20" />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#006B4F] text-white flex items-center justify-center font-bold text-sm">
            {iniciais(candidato.nomeCompleto)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 truncate">{candidato.nomeCompleto}</p>
          <p className="text-xs text-gray-400 truncate">{candidato.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <MapPin size={13} className="text-[#006B4F] shrink-0" />
          <span className="truncate">{candidato.provincia}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={13} className="text-[#006B4F] shrink-0" />
          <span>{exp} {exp === 1 ? "ano" : "anos"} de experiência</span>
        </div>
      </div>

      <div className="flex gap-1 pt-2 border-t border-gray-50">
        {[
          { label: "Ver",    icon: Eye,    cor: "text-[#006B4F] hover:bg-[#006B4F]/10", fn: () => aoVer(candidato) },
          { label: "Editar", icon: Pencil, cor: "text-blue-600 hover:bg-blue-50",       fn: () => aoEditar(candidato) },
          { label: "Apagar", icon: Trash2, cor: "text-red-500 hover:bg-red-50",         fn: () => aoRemover(candidato.id) },
        ].map(({ label, icon: Icon, cor, fn }) => (
          <button key={label} onClick={fn}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${cor}`}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}