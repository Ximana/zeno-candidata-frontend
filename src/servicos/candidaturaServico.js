import { pedido } from "./api";

export async function listarCandidaturas() {
  return pedido("/candidaturas");
}

export async function buscarCandidaturaPorId(id) {
  return pedido(`/candidaturas/${id}`);
}

export async function criarCandidatura(dados) {
  return pedido("/candidaturas", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarCandidatura(id, dados) {
  return pedido(`/candidaturas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function removerCandidatura(id) {
  return pedido(`/candidaturas/${id}`, { method: "DELETE" });
}