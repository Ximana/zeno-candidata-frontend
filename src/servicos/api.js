// Ficheiro central que faz todos os pedidos HTTP à API Express

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Função para pedidos JSON (GET, POST, PUT, DELETE)
async function pedido(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });

  // Se a resposta não for OK, mostra um erro com a mensagem da API
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({ erro: "Erro desconhecido" }));
    throw new Error(erro.erro || "Erro na comunicação com a API");
  }

  // Respostas 204 (DELETE) não têm corpo
  if (resposta.status === 204) return null;

  return resposta.json();
}

// Função especial para pedidos com FormData (upload de ficheiros)
async function pedidoFormData(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...opcoes,
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({ erro: "Erro desconhecido" }));
    throw new Error(erro.erro || "Erro na comunicação com a API");
  }

  if (resposta.status === 204) return null;

  return resposta.json();
}

export { pedido, pedidoFormData };