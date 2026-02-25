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

  // Carrega candidatos da API ao montar
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarCandidatos();
        setCandidatos(dados);
      } catch {
        mostrarErro("Erro ao carregar candidatos.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // Filtragem local (não precisa chamar a API para pesquisar)
  const candidatosFiltrados = candidatos.filter((c) => {
    const termo = pesquisa.toLowerCase();
    return (
      c.nomeCompleto.toLowerCase().includes(termo) ||
      c.email.toLowerCase().includes(termo) ||
      c.provincia.toLowerCase().includes(termo)
    );
  });

  // ficheiro é o File do input, dados são os campos de texto
  async function adicionar(dados, ficheiro) {
    try {
      const novo = await criarCandidato(dados, ficheiro);
      setCandidatos((prev) => [novo, ...prev]);
      mostrarSucesso("Candidato cadastrado com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao cadastrar candidato.");
      return false;
    }
  }

  async function atualizar(id, dados, ficheiro) {
    try {
      const atualizado = await atualizarCandidato(id, dados, ficheiro);
      setCandidatos((prev) => prev.map((c) => (c.id === id ? atualizado : c)));
      mostrarSucesso("Candidato actualizado com sucesso!");
      return true;
    } catch (err) {
      mostrarErro(err.message || "Erro ao actualizar candidato.");
      return false;
    }
  }

  async function remover(id) {
    try {
      await removerCandidato(id);
      setCandidatos((prev) => prev.filter((c) => c.id !== id));
      mostrarSucesso("Candidato removido com sucesso!");
    } catch (err) {
      mostrarErro(err.message || "Erro ao remover candidato.");
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