"use client";

import { useState, useEffect } from "react";
import {
  listarVagas,
  criarVaga,
  atualizarVaga,
  removerVaga,
} from "@/servicos/vagaServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";

export function useVagas() {
  const [vagas, setVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarVagas();
        setVagas(dados);
      } catch {
        mostrarErro("Erro ao carregar vagas.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function adicionar(dados) {
    try {
      const nova = await criarVaga(dados);
      setVagas((prev) => [nova, ...prev]);
      mostrarSucesso("Vaga criada com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao criar vaga.");
      return false;
    }
  }

  async function atualizar(id, dados) {
    try {
      const atualizada = await atualizarVaga(id, dados);
      setVagas((prev) => prev.map((v) => (v.id === id ? atualizada : v)));
      mostrarSucesso("Vaga actualizada com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao actualizar vaga.");
      return false;
    }
  }

  async function remover(id) {
    try {
      await removerVaga(id);
      setVagas((prev) => prev.filter((v) => v.id !== id));
      mostrarSucesso("Vaga removida com sucesso!");
    } catch (err) {
      mostrarErro(err.message || "Erro ao remover vaga.");
    }
  }

  return { vagas, carregando, adicionar, atualizar, remover, total: vagas.length };
}