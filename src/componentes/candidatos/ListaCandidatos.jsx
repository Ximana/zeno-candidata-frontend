"use client";

import { useState } from "react";
import { Search, UserPlus, Users, Pencil, Trash2, Eye } from "lucide-react";
import { useCandidatos } from "@/hooks/useCandidatos";
import ModalFormularioCandidato from "./ModalFormularioCandidato";
import ModalVerCandidato from "./ModalVerCandidato";
import Botao from "@/componentes/ui/Button";
import { iniciais } from "@/utils/helpers";

export default function ListaCandidatos() {
  const { candidatos, carregando, pesquisa, setPesquisa, adicionar, atualizar, remover, total } = useCandidatos();

  const [modalForm, setModalForm]       = useState(false);
  const [modalVer, setModalVer]         = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  function abrirForm(candidato = null) { setSeleccionado(candidato); setModalForm(true); }
  function abrirVer(candidato)         { setSeleccionado(candidato); setModalVer(true); }

  async function aoSalvar(dados, ficheiro) {
    if (seleccionado) {
      await atualizar(seleccionado.id, dados, ficheiro);
    } else {
      await adicionar(dados, ficheiro);
    }
    setModalForm(false);
  }

  if (carregando) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006B4F]" />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mt-0.5">{total} registados</p>
        </div>
        <Botao variante="primario" onClick={() => abrirForm()}>
          <UserPlus size={16} /> Novo Candidato
        </Botao>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquisar por nome, email ou província..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all" />
      </div>

      {candidatos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={44} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{pesquisa ? "Nenhum candidato encontrado." : "Nenhum candidato cadastrado."}</p>
        </div>
      ) : (
        <>
          {/* Desktop tabela */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Candidato", "Email", "Província", "Acções"].map((col) => (
                    <th key={col} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidatos.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {c.foto ? (
                          <img src={c.foto} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold">
                            {iniciais(c.nomeCompleto || "?")}
                          </div>
                        )}
                        <span className="font-medium text-gray-700">{c.nomeCompleto || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{c.email || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{c.provincia || "—"}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => abrirVer(c)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => abrirForm(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => remover(c.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cartões */}
          <div className="md:hidden flex flex-col gap-3">
            {candidatos.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {c.foto ? (
                      <img src={c.foto} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {iniciais(c.nomeCompleto || "?")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.nomeCompleto || "—"}</p>
                      <p className="text-xs text-gray-400 truncate">{c.email || "—"}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{c.provincia || "—"}</span>
                </div>
                <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-50">
                  <button onClick={() => abrirVer(c)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => abrirForm(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => remover(c.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ModalFormularioCandidato
        aberto={modalForm} aoFechar={() => setModalForm(false)}
        candidato={seleccionado} aoSalvar={aoSalvar} />
      <ModalVerCandidato
        aberto={modalVer} aoFechar={() => setModalVer(false)}
        candidato={seleccionado} />
    </div>
  );
}