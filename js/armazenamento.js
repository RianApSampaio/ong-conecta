const CHAVE = 'parceiros_ong_conecta';

function gerarId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Pode lançar erro (cota cheia, modo privado, armazenamento bloqueado).
// Quem chama deve tratar com try/catch.
function gravar(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function listarParceiros() {
  try {
    const dados = localStorage.getItem(CHAVE);
    const lista = dados ? JSON.parse(dados) : [];
    return Array.isArray(lista) ? lista : [];
  } catch {
    console.warn('Dados corrompidos ou indisponíveis no armazenamento — usando lista vazia');
    return [];
  }
}

export function salvarParceiro(dados) {
  const parceiro = { ...dados, id: gerarId() };
  gravar([...listarParceiros(), parceiro]);
  return parceiro;
}

export function removerParceiro(id) {
  gravar(listarParceiros().filter((item) => item.id !== id));
}