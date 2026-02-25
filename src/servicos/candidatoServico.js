import { pedido, pedidoFormData } from "./api";

export async function listarCandidatos() {
  return pedido("/candidatos");
}

export async function buscarCandidatoPorId(id) {
  return pedido(`/candidatos/${id}`);
}

// Criar candidato usa FormData por causa do upload de foto
export async function criarCandidato(dados, ficheiro) {
  const formData = new FormData();

  // Adiciona todos os campos de texto ao FormData
  Object.entries(dados).forEach(([chave, valor]) => {
    if (valor !== null && valor !== undefined && valor !== "") {
      formData.append(chave, valor);
    }
  });

  // Adiciona a foto se existir
  if (ficheiro) {
    formData.append("foto", ficheiro);
  }

  return pedidoFormData("/candidatos", {
    method: "POST",
    body: formData,
  });
}

// Actualizar candidato também usa FormData (pode ter nova foto)
export async function atualizarCandidato(id, dados, ficheiro) {
  const formData = new FormData();

  Object.entries(dados).forEach(([chave, valor]) => {
    if (valor !== null && valor !== undefined && valor !== "") {
      formData.append(chave, valor);
    }
  });

  if (ficheiro) {
    formData.append("foto", ficheiro);
  }

  return pedidoFormData(`/candidatos/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export async function removerCandidato(id) {
  return pedido(`/candidatos/${id}`, { method: "DELETE" });
}

// --- Formações (aninhadas no candidato) ---

export async function listarFormacoesPorCandidato(candidatoId) {
  return pedido(`/candidatos/${candidatoId}/formacoes`);
}

export async function criarFormacao(candidatoId, dados) {
  return pedido(`/candidatos/${candidatoId}/formacoes`, {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarFormacao(candidatoId, formacaoId, dados) {
  return pedido(`/candidatos/${candidatoId}/formacoes/${formacaoId}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function removerFormacao(candidatoId, formacaoId) {
  return pedido(`/candidatos/${candidatoId}/formacoes/${formacaoId}`, {
    method: "DELETE",
  });
}