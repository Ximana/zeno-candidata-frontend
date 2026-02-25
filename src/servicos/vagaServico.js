import { pedido } from "./api";

export async function listarVagas() {
  return pedido("/vagas");
}

export async function buscarVagaPorId(id) {
  return pedido(`/vagas/${id}`);
}

export async function criarVaga(dados) {
  return pedido("/vagas", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarVaga(id, dados) {
  return pedido(`/vagas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function removerVaga(id) {
  return pedido(`/vagas/${id}`, { method: "DELETE" });
}