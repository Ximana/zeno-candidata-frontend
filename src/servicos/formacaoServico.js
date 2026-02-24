import formacoesData from "@/dados/formacoes.json";
import { gerarId } from "@/utils/helpers";

let formacoes = [...formacoesData];

export function listarFormacoesPorCandidato(candidatoId) {
  return formacoes.filter((f) => f.candidatoId === candidatoId);
}

export function criarFormacao(dados) {
  const nova = { ...dados, id: gerarId() };
  formacoes = [...formacoes, nova];
  return nova;
}

export function removerFormacao(id) {
  formacoes = formacoes.filter((f) => f.id !== id);
}