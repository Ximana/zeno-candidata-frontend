"use client";

import { useState, useEffect } from "react";
import {
  listarCandidaturas,
  criarCandidatura,
  atualizarCandidatura,
  removerCandidatura,
} from "@/servicos/candidaturaServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";

export function useCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarCandidaturas();
        setCandidaturas(dados);
      } catch {
        mostrarErro("Erro ao carregar candidaturas.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function adicionar(dados) {
    try {
      const nova = await criarCandidatura(dados);
      setCandidaturas((prev) => [nova, ...prev]);
      mostrarSucesso("Candidatura registada com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao registar candidatura.");
      return false;
    }
  }

  async function atualizar(id, dados) {
    try {
      const atualizada = await atualizarCandidatura(id, dados);
      setCandidaturas((prev) => prev.map((c) => (c.id === id ? atualizada : c)));
      mostrarSucesso("Candidatura actualizada com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao actualizar candidatura.");
      return false;
    }
  }

  async function remover(id) {
    try {
      await removerCandidatura(id);
      setCandidaturas((prev) => prev.filter((c) => c.id !== id));
      mostrarSucesso("Candidatura removida com sucesso!");
    } catch (err) {
      mostrarErro(err.message || "Erro ao remover candidatura.");
    }
  }

  return { candidaturas, carregando, adicionar, atualizar, remover, total: candidaturas.length };
}