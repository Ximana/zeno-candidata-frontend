"use client";

import { useState, useEffect } from "react";
import Header from "@/componentes/layout/Header";
import ModalFormularioVaga from "@/componentes/vagas/ModalFormularioVaga";
import Botao from "@/componentes/ui/Button";
import { listarVagas, criarVaga, atualizarVaga, removerVaga } from "@/servicos/vagaServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";
import { formatarData } from "@/utils/helpers";
import { Briefcase, Building2, Calendar, Plus, Pencil, Trash2 } from "lucide-react";

export default function PaginaVagas() {
  const [vagas, setVagas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  // Carrega vagas ao montar
  useEffect(() => {
    setVagas(listarVagas());
  }, []);

  function abrirNovoModal() {
    setVagaSelecionada(null);
    setModalAberto(true);
  }

  function abrirEditarModal(vaga) {
    setVagaSelecionada(vaga);
    setModalAberto(true);
  }

  function aoSalvar(dados) {
    try {
      if (vagaSelecionada) {
        const atualizada = atualizarVaga(vagaSelecionada.id, dados);
        setVagas((prev) => prev.map((v) => (v.id === vagaSelecionada.id ? atualizada : v)));
        mostrarSucesso("Vaga actualizada com sucesso!");
      } else {
        const nova = criarVaga(dados);
        setVagas((prev) => [nova, ...prev]);
        mostrarSucesso("Vaga criada com sucesso!");
      }
    } catch {
      mostrarErro("Ocorreu um erro. Tente novamente.");
    }
  }

  function aoRemover(id) {
    try {
      removerVaga(id);
      setVagas((prev) => prev.filter((v) => v.id !== id));
      mostrarSucesso("Vaga removida com sucesso!");
    } catch {
      mostrarErro("Erro ao remover vaga.");
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Vagas" />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        {/* Topo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vagas</h1>
            <p className="text-sm text-gray-400 mt-0.5">{vagas.length} vagas disponíveis</p>
          </div>
          <Botao variante="primario" onClick={abrirNovoModal}>
            <Plus size={16} />
            Nova Vaga
          </Botao>
        </div>

        {/* Lista de vagas */}
        {vagas.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Briefcase size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma vaga cadastrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vagas.map((vaga) => (
              <div
                key={vaga.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#006B4F]/10 rounded-lg shrink-0">
                    <Briefcase size={18} className="text-[#006B4F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{vaga.titulo}</h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                      <Building2 size={12} />
                      {vaga.departamento}
                    </div>
                  </div>
                </div>

                {vaga.descricao && (
                  <p className="text-sm text-gray-500 line-clamp-2">{vaga.descricao}</p>
                )}

                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  Publicada em {formatarData(vaga.criadoEm)}
                </div>

                {/* Acções */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                  <button
                    onClick={() => abrirEditarModal(vaga)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={13} />
                    Editar
                  </button>
                  <button
                    onClick={() => aoRemover(vaga.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalFormularioVaga
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        vaga={vagaSelecionada}
        aoSalvar={aoSalvar}
      />
    </div>
  );
}