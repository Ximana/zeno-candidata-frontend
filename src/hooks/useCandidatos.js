"use client";

import { useState, useEffect } from "react";
import {
  listarCandidatos,
  criarCandidato,
  atualizarCandidato,
  removerCandidato,
} from "@/servicos/candidatoServico";
import { mostrarSucesso, mostrarErro } from "@/utils/toast";

export function useCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    setCandidatos(listarCandidatos());
    setCarregando(false);
  }, []);

  const candidatosFiltrados = candidatos.filter((c) => {
    const termo = pesquisa.toLowerCase();
    return (
      c.nomeCompleto.toLowerCase().includes(termo) ||
      c.email.toLowerCase().includes(termo) ||
      c.provincia.toLowerCase().includes(termo)
    );
  });

  function adicionar(dados) {
    try {
      const novo = criarCandidato(dados);
      setCandidatos((prev) => [novo, ...prev]);
      mostrarSucesso("Candidato cadastrado com sucesso!");
      return true;
    } catch {
      mostrarErro("Erro ao cadastrar candidato.");
      return false;
    }
  }

  function atualizar(id, dados) {
    try {
      const atualizado = atualizarCandidato(id, dados);
      setCandidatos((prev) =>
        prev.map((c) => (c.id === id ? atualizado : c))
      );
      mostrarSucesso("Candidato atualizado com sucesso!");
      return true;
    } catch {
      mostrarErro("Erro ao atualizar candidato.");
      return false;
    }
  }

  function remover(id) {
    try {
      removerCandidato(id);
      setCandidatos((prev) => prev.filter((c) => c.id !== id));
      mostrarSucesso("Candidato removido com sucesso!");
    } catch {
      mostrarErro("Erro ao remover candidato.");
    }
  }

  return {
    candidatos: candidatosFiltrados,
    carregando,
    pesquisa,
    setPesquisa,
    adicionar,
    atualizar,
    remover,
    total: candidatos.length,
  };
}