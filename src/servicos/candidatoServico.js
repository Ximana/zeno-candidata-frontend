import candidatosData from "@/dados/candidatos.json";
import { gerarId } from "@/utils/helpers";

let candidatos = [...candidatosData];

export function listarCandidatos() {
  return candidatos;
}

export function buscarCandidatoPorId(id) {
  return candidatos.find((c) => c.id === id) || null;
}

export function criarCandidato(dados) {
  const novo = {
    ...dados,
    id: gerarId(),
    criadoEm: new Date().toISOString(),
  };
  candidatos = [novo, ...candidatos];
  return novo;
}

export function atualizarCandidato(id, dados) {
  candidatos = candidatos.map((c) =>
    c.id === id ? { ...c, ...dados } : c
  );
  return candidatos.find((c) => c.id === id);
}

export function removerCandidato(id) {
  candidatos = candidatos.filter((c) => c.id !== id);
}