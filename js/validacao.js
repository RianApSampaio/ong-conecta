const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Valida os campos informados (por padrão, nome e e-mail).
// Retorna uma lista de erros: [{ campo, mensagem }]
export function validarCampos(form, campos = ['nome', 'email']) {
  const erros = [];

  if (campos.includes('nome')) {
    const nome = form.nome.value.trim();
    if (!nome) {
      erros.push({ campo: 'nome', mensagem: 'O nome é obrigatório.' });
    } else if (nome.length < 3) {
      erros.push({ campo: 'nome', mensagem: 'O nome precisa de pelo menos 3 caracteres.' });
    }
  }

  if (campos.includes('email')) {
    const email = form.email.value.trim();
    if (!email) {
      erros.push({ campo: 'email', mensagem: 'O e-mail é obrigatório.' });
    } else if (!REGEX_EMAIL.test(email)) {
      erros.push({ campo: 'email', mensagem: 'Digite um e-mail válido, como nome@exemplo.com.' });
    }
  }

  return erros;
}

export function mostrarErros(erros, form) {
  erros.forEach((erro) => {
    const campo = form[erro.campo];
    campo.classList.add('invalido');
    campo.setAttribute('aria-invalid', 'true');

    const aviso = document.getElementById(`erro-${erro.campo}`);
    if (aviso) aviso.textContent = erro.mensagem;
  });
}

// Limpa os erros dos campos informados (por padrão, todos)
export function limparErros(form, campos = ['nome', 'email', 'telefone']) {
  campos.forEach((nome) => {
    const campo = form[nome];
    if (!campo) return;

    campo.classList.remove('invalido');
    campo.removeAttribute('aria-invalid');

    const aviso = document.getElementById(`erro-${nome}`);
    if (aviso) aviso.textContent = '';
  });
}
