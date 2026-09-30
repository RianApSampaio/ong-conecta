import { inicializarNavegacao, navegarPara } from './navegacao.js';
import { validarCampos, mostrarErros, limparErros } from './validacao.js';
import { salvarParceiro, listarParceiros } from './armazenamento.js';
import { renderizarLista } from './templates.js';

let temporizadorRedirecionamento = null;

inicializarNavegacao();

document.addEventListener('paginaCarregada', (e) => {
  // Se o usuário trocou de página antes do redirecionamento, cancela o timer
  clearTimeout(temporizadorRedirecionamento);

  if (e.detail.rota === '/cadastro') {
    vincularFormulario();
  }

  if (e.detail.rota === '/lista') {
    renderizarLista(listarParceiros());
  }
});

function mostrarMensagem(tipo, texto) {
  const area = document.getElementById('area-mensagem');
  if (!area) return;

  const div = document.createElement('div');
  div.className = `mensagem ${tipo}`;
  div.textContent = texto;

  area.textContent = '';
  area.appendChild(div);
}

function vincularFormulario() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  // Ao digitar: remove o erro daquele campo
  // Ao sair do campo: valida aquele campo
  ['nome', 'email'].forEach((nome) => {
    form[nome].addEventListener('input', () => limparErros(form, [nome]));
    form[nome].addEventListener('blur', () => {
      limparErros(form, [nome]);
      mostrarErros(validarCampos(form, [nome]), form);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    limparErros(form);

    const erros = validarCampos(form);

    if (erros.length) {
      mostrarErros(erros, form);
      form[erros[0].campo].focus();
      return;
    }

    const dados = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim() || null
    };

    try {
      salvarParceiro(dados);
    } catch (erro) {
      console.error('Falha ao salvar no localStorage:', erro);
      mostrarMensagem('erro', 'Não foi possível salvar o cadastro. Verifique se o armazenamento do navegador está disponível.');
      return;
    }

    mostrarMensagem('sucesso', '✅ Cadastro realizado! Redirecionando...');
    form.reset();

    temporizadorRedirecionamento = setTimeout(() => navegarPara('/lista'), 1200);
  });
}
