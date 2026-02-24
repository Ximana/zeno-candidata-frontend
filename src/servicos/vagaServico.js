import vagasData from "@/dados/vagas.json";
import { gerarId } from "@/utils/helpers";

let vagas = [...vagasData];

export function listarVagas() {
  return vagas;
}

export function criarVaga(dados) {
  const nova = {
    ...dados,
    id: gerarId(),
    criadoEm: new Date().toISOString(),
  };
  vagas = [nova, ...vagas];
  return nova;
}

export function atualizarVaga(id, dados) {
  vagas = vagas.map((v) => (v.id === id ? { ...v, ...dados } : v));
  return vagas.find((v) => v.id === id);
}

export function removerVaga(id) {
  vagas = vagas.filter((v) => v.id !== id);
}