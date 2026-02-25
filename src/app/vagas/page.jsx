"use client";

import { useState, useEffect } from "react";
import Header from "@/componentes/layout/Header";
import ModalFormularioVaga from "@/componentes/vagas/ModalFormularioVaga";
import Botao from "@/componentes/ui/Button";
import { listarVagas, criarVaga, atualizarVaga, removerVaga } from "@/servicos/vagaServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";
import { formatarData } from "@/utils/helpers";
import { Briefcase, Plus, Pencil, Trash2 } from "lucide-react";

export default function Vagas() {
  const [vagas, setVagas]               = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [modalAberto, setModalAberto]   = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    listarVagas()
      .then(setVagas)
      .catch(() => mostrarErro("Erro ao carregar vagas."))
      .finally(() => setCarregando(false));
  }, []);

  function abrirModal(vaga = null) {
    setSeleccionada(vaga);
    setModalAberto(true);
  }

  async function aoSalvar(dados) {
    try {
      if (seleccionada) {
        const atualizada = await atualizarVaga(seleccionada.id, dados);
        setVagas((prev) => prev.map((v) => (v.id === seleccionada.id ? atualizada : v)));
        mostrarSucesso("Vaga actualizada!");
      } else {
        const nova = await criarVaga(dados);
        setVagas((prev) => [nova, ...prev]);
        mostrarSucesso("Vaga criada!");
      }
    } catch (err) {
      mostrarErro(err.message || "Ocorreu um erro.");
    }
  }

  async function aoRemover(id) {
    try {
      await removerVaga(id);
      setVagas((prev) => prev.filter((v) => v.id !== id));
      mostrarSucesso("Vaga removida!");
    } catch (err) {
      mostrarErro(err.message || "Erro ao remover.");
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Vagas" />

      <div className="p-4 lg:p-6 flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mt-0.5">{vagas.length} disponíveis</p>
          </div>
          <Botao variante="primario" onClick={() => abrirModal()}>
            <Plus size={16} /> Nova Vaga
          </Botao>
        </div>

        {carregando ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white rounded-xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : vagas.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Briefcase size={44} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma vaga cadastrada.</p>
          </div>
        ) : (
          <>
            {/* Desktop tabela */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Título", "Departamento", "Descrição", "Publicada em", "Acções"].map((col) => (
                      <th key={col} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vagas.map((vaga) => (
                    <tr key={vaga.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-700">{vaga.titulo}</td>
                      <td className="px-5 py-3 text-gray-500">{vaga.departamento || "—"}</td>
                      <td className="px-5 py-3 text-gray-500 max-w-xs">
                        <span className="line-clamp-1">{vaga.descricao || "—"}</span>
                      </td>
                      <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{formatarData(vaga.criadoEm)}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => abrirModal(vaga)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => aoRemover(vaga.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
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
              {vagas.map((vaga) => (
                <div key={vaga.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{vaga.titulo}</p>
                      <p className="text-xs text-gray-400 truncate">{vaga.departamento || "—"}</p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">{formatarData(vaga.criadoEm)}</span>
                  </div>
                  {vaga.descricao && (
                    <p className="text-xs text-gray-500 line-clamp-2">{vaga.descricao}</p>
                  )}
                  <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-50">
                    <button onClick={() => abrirModal(vaga)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => aoRemover(vaga.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ModalFormularioVaga
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        vaga={seleccionada}
        aoSalvar={aoSalvar}
      />
    </div>
  );
}