import { removerParceiro, listarParceiros } from './armazenamento.js';

// Cria um elemento com texto seguro (textContent nunca interpreta HTML)
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

export function renderizarLista(parceiros) {
  const area = document.getElementById('area-lista');
  if (!area) return;

  area.textContent = '';

  if (!parceiros.length) {
    area.appendChild(
      criarElemento(
        'p',
        'text-muted text-center py-4',
        'Ainda não há parceiros cadastrados. Seja o primeiro! 💚'
      )
    );
    return;
  }

  parceiros.forEach((p) => {
    const cartao = criarElemento('div', 'cartao');
    cartao.setAttribute('data-id', p.id);

    const nome = criarElemento('h3', 'h5 mb-1', p.nome);
    const email = criarElemento('p', 'text-muted mb-2', p.email);

    const botao = criarElemento('button', 'btn btn-sm btn-outline-danger botao-excluir', 'Remover');
    botao.type = 'button';
    botao.setAttribute('aria-label', `Remover parceiro ${p.nome}`);
    botao.addEventListener('click', () => {
      if (!confirm('Tem certeza que deseja remover este parceiro?')) return;

      try {
        removerParceiro(p.id);
        renderizarLista(listarParceiros());
      } catch (erro) {
        console.error('Falha ao remover do localStorage:', erro);
        alert('Não foi possível remover o parceiro. Verifique se o armazenamento do navegador está disponível.');
      }
    });

    cartao.append(nome, email);

    if (p.telefone) {
      cartao.appendChild(criarElemento('p', 'mb-3', `📞 ${p.telefone}`));
    }

    cartao.appendChild(botao);
    area.appendChild(cartao);
  });
}