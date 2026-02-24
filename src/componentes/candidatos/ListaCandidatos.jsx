"use client";

import { useState } from "react";
import { Search, UserPlus, Users } from "lucide-react";
import { useCandidatos } from "@/hooks/useCandidatos";
import CardCandidato from "./CardCandidato";
import ModalFormularioCandidato from "./ModalFormularioCandidato";
import ModalVerCandidato from "./ModalVerCandidato";
import Botao from "@/componentes/ui/Button";

export default function ListaCandidatos() {
  const {
    candidatos,
    carregando,
    pesquisa,
    setPesquisa,
    adicionar,
    atualizar,
    remover,
    total,
  } = useCandidatos();

  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [modalVerAberto, setModalVerAberto] = useState(false);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);

  function abrirNovoModal() {
    setCandidatoSelecionado(null);
    setModalFormAberto(true);
  }

  function abrirEditarModal(candidato) {
    setCandidatoSelecionado(candidato);
    setModalFormAberto(true);
  }

  function abrirVerModal(candidato) {
    setCandidatoSelecionado(candidato);
    setModalVerAberto(true);
  }

  // O modal agora passa (dados, formacoes) no aoSalvar
  function aoSalvar(dados, formacoes) {
    if (candidatoSelecionado) {
      atualizar(candidatoSelecionado.id, dados);
    } else {
      adicionar(dados);
    }
    // formacoes podem ser guardadas aqui também se necessário
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006B4F]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Candidatos</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {total} {total === 1 ? "candidato registado" : "candidatos registados"}
          </p>
        </div>
        <Botao variante="primario" onClick={abrirNovoModal}>
          <UserPlus size={16} />
          Novo Candidato
        </Botao>
      </div>

      {/* Pesquisa */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquisar por nome, email ou província..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all"
        />
      </div>

      {/* Grid de candidatos */}
      {candidatos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            {pesquisa ? "Nenhum candidato encontrado." : "Nenhum candidato cadastrado."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {candidatos.map((c) => (
            <CardCandidato
              key={c.id}
              candidato={c}
              aoVer={abrirVerModal}
              aoEditar={abrirEditarModal}
              aoRemover={remover}
            />
          ))}
        </div>
      )}

      {/* Modais */}
      <ModalFormularioCandidato
        aberto={modalFormAberto}
        aoFechar={() => setModalFormAberto(false)}
        candidato={candidatoSelecionado}
        aoSalvar={aoSalvar}
      />
      <ModalVerCandidato
        aberto={modalVerAberto}
        aoFechar={() => setModalVerAberto(false)}
        candidato={candidatoSelecionado}
      />
    </div>
  );
}