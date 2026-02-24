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

// Cores para o badge de estado
const coresEstado = {
  "Em análise": "bg-yellow-100 text-yellow-700",
  Aprovado: "bg-emerald-100 text-emerald-700",
  Reprovado: "bg-red-100 text-red-700",
};

export default function PaginaCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [candidaturaSelecionada, setCandidaturaSelecionada] = useState(null);

  // Carrega dados ao montar a página
  useEffect(() => {
    setCandidaturas(listarCandidaturas());
    setCandidatos(listarCandidatos());
    setVagas(listarVagas());
  }, []);

  function abrirNovoModal() {
    setCandidaturaSelecionada(null);
    setModalAberto(true);
  }

  function abrirEditarModal(candidatura) {
    setCandidaturaSelecionada(candidatura);
    setModalAberto(true);
  }

  function aoSalvar(dados) {
    try {
      if (candidaturaSelecionada) {
        const atualizada = atualizarCandidatura(candidaturaSelecionada.id, dados);
        setCandidaturas((prev) =>
          prev.map((c) => (c.id === candidaturaSelecionada.id ? atualizada : c))
        );
        mostrarSucesso("Candidatura actualizada!");
      } else {
        const nova = criarCandidatura(dados);
        setCandidaturas((prev) => [nova, ...prev]);
        mostrarSucesso("Candidatura registada com sucesso!");
      }
    } catch {
      mostrarErro("Ocorreu um erro. Tente novamente.");
    }
  }

  function aoRemover(id) {
    try {
      removerCandidatura(id);
      setCandidaturas((prev) => prev.filter((c) => c.id !== id));
      mostrarSucesso("Candidatura removida!");
    } catch {
      mostrarErro("Erro ao remover candidatura.");
    }
  }

  // Helpers para encontrar nome do candidato/vaga pelo id
  function nomeCandidato(id) {
    return candidatos.find((c) => c.id === id);
  }
  function nomeVaga(id) {
    return vagas.find((v) => v.id === id);
  }

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Candidaturas" />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        {/* Topo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Candidaturas</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {candidaturas.length} candidaturas registadas
            </p>
          </div>
          <Botao variante="primario" onClick={abrirNovoModal}>
            <Plus size={16} />
            Nova Candidatura
          </Botao>
        </div>

        {/* Tabela — em mobile vira cartões */}
        {candidaturas.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma candidatura registada.</p>
          </div>
        ) : (
          <>
            {/* Versão desktop: tabela */}
            <div className="hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Candidato</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Vaga</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Estado</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Data</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Acções</th>
                  </tr>
                </thead>
                <tbody>
                  {candidaturas.map((c) => {
                    const candidato = nomeCandidato(c.candidatoId);
                    const vaga = nomeVaga(c.vagaId);
                    return (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
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
                        <td className="px-5 py-3 text-gray-400">{formatarData(c.criadoEm)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => abrirEditarModal(c)}
                              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => aoRemover(c.id)}
                              className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                            >
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

            {/* Versão mobile: cartões */}
            <div className="sm:hidden flex flex-col gap-3">
              {candidaturas.map((c) => {
                const candidato = nomeCandidato(c.candidatoId);
                const vaga = nomeVaga(c.vagaId);
                return (
                  <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {candidato?.foto ? (
                          <img src={candidato.foto} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold">
                            {iniciais(candidato?.nomeCompleto || "?")}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{candidato?.nomeCompleto || "—"}</p>
                          <p className="text-xs text-gray-400">{vaga?.titulo || "—"}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${coresEstado[c.estado]}`}>
                        {c.estado}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{formatarData(c.criadoEm)}</span>
                      <div className="flex gap-2">
                        <button onClick={() => abrirEditarModal(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
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

      {/* Modal */}
      <ModalFormularioCandidatura
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        candidatura={candidaturaSelecionada}
        candidatos={candidatos}
        vagas={vagas}
        aoSalvar={aoSalvar}
      />
    </div>
  );
}