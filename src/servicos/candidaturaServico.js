import candidaturasData from "@/dados/candidaturas.json";
import { gerarId } from "@/utils/helpers";

let candidaturas = [...candidaturasData];

export function listarCandidaturas() {
  return candidaturas;
}

export function criarCandidatura(dados) {
  const nova = {
    ...dados,
    id: gerarId(),
    criadoEm: new Date().toISOString(),
  };
  candidaturas = [nova, ...candidaturas];
  return nova;
}

export function atualizarCandidatura(id, dados) {
  candidaturas = candidaturas.map((c) =>
    c.id === id ? { ...c, ...dados } : c,
  );
  return candidaturas.find((c) => c.id === id);
}

export function removerCandidatura(id) {
  candidaturas = candidaturas.filter((c) => c.id !== id);
}
