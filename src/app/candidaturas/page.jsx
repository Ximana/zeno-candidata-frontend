"use client";

import { useState, useEffect } from "react";
import Header from "@/componentes/layout/Header";
import ModalFormularioCandidatura from "@/componentes/candidaturas/ModalFormularioCandidatura";
import Botao from "@/componentes/ui/Button";
import {
  listarCandidaturas,
  criarCandidatura,
  atualizarCandidatura,
  removerCandidatura,
} from "@/servicos/candidaturaServico";
import { listarCandidatos } from "@/servicos/candidatoServico";
import { listarVagas } from "@/servicos/vagaServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";
import { formatarData, iniciais } from "@/utils/helpers";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";

const coresEstado = {
  "Em análise": "bg-yellow-100 text-yellow-700",
  Aprovado:     "bg-emerald-100 text-emerald-700",
  Reprovado:    "bg-red-100 text-red-700",
};

export default function PaginaCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [candidatos, setCandidatos]     = useState([]);
  const [vagas, setVagas]               = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [modalAberto, setModalAberto]   = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [c, ca, v] = await Promise.all([
          listarCandidatos(),
          listarCandidaturas(),
          listarVagas(),
        ]);
        setCandidatos(c);
        setCandidaturas(ca);
        setVagas(v);
      } catch {
        mostrarErro("Erro ao carregar dados.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  function abrirModal(candidatura = null) {
    setSeleccionada(candidatura);
    setModalAberto(true);
  }

  async function aoSalvar(dados) {
    try {
      if (seleccionada) {
        const atualizada = await atualizarCandidatura(seleccionada.id, dados);
        setCandidaturas((prev) => prev.map((c) => (c.id === seleccionada.id ? atualizada : c)));
        mostrarSucesso("Candidatura actualizada!");
      } else {
        const nova = await criarCandidatura(dados);
        setCandidaturas((prev) => [nova, ...prev]);
        mostrarSucesso("Candidatura registada!");
      }
    } catch (err) {
      mostrarErro(err.message || "Ocorreu um erro.");
    }
  }

  async function aoRemover(id) {
    try {
      await removerCandidatura(id);
      setCandidaturas((prev) => prev.filter((c) => c.id !== id));
      mostrarSucesso("Candidatura removida!");
    } catch (err) {
      mostrarErro(err.message || "Erro ao remover.");
    }
  }

  const getCandidato = (c) => c.candidato || candidatos.find((cd) => cd.id === c.candidatoId);
  const getVaga      = (c) => c.vaga      || vagas.find((v) => v.id === c.vagaId);

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Candidaturas" />

      <div className="p-4 lg:p-6 flex flex-col gap-6">

        {/* Topo */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mt-0.5">{candidaturas.length} registadas</p>
          </div>
          <Botao variante="primario" onClick={() => abrirModal()}>
            <Plus size={16} /> Nova Candidatura
          </Botao>
        </div>

        {/* Conteúdo */}
        {carregando ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white rounded-xl border border-gray-100 animate-pulse" />
            ))}
          </div>

        ) : candidaturas.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FileText size={44} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma candidatura registada.</p>
          </div>

        ) : (
          <>
            {/* Desktop tabela */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Candidato", "Vaga", "Estado", "Data", "Acções"].map((col) => (
                      <th key={col} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {candidaturas.map((c) => {
                    const candidato = getCandidato(c);
                    const vaga      = getVaga(c);
                    return (
                      <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            {candidato?.foto ? (
                              <img src={candidato.foto} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold">
                                {iniciais(candidato?.nomeCompleto || "?")}
                              </div>
                            )}
                            <span className="font-medium text-gray-700">{candidato?.nomeCompleto || "—"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500">{vaga?.titulo || "—"}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${coresEstado[c.estado]}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{formatarData(c.criadoEm)}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => abrirModal(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => aoRemover(c.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cartões */}
            <div className="md:hidden flex flex-col gap-3">
              {candidaturas.map((c) => {
                const candidato = getCandidato(c);
                const vaga      = getVaga(c);
                return (
                  <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {candidato?.foto ? (
                          <img src={candidato.foto} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {iniciais(candidato?.nomeCompleto || "?")}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{candidato?.nomeCompleto || "—"}</p>
                          <p className="text-xs text-gray-400 truncate">{vaga?.titulo || "—"}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${coresEstado[c.estado]}`}>
                        {c.estado}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-xs text-gray-400">{formatarData(c.criadoEm)}</span>
                      <div className="flex gap-1">
                        <button onClick={() => abrirModal(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => aoRemover(c.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <ModalFormularioCandidatura
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        candidatura={seleccionada}
        candidatos={candidatos}
        vagas={vagas}
        aoSalvar={aoSalvar}
      />
    </div>
  );
}