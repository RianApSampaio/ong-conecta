const rotas = {
  '/': {
    titulo: 'Início — ONG Conecta',
    render: () => `
      <div class="row align-items-center py-5">
        <div class="col-md-6">
          <h1 class="display-4 fw-bold mb-4">Conectando quem faz o bem 💚</h1>
          <p class="lead mb-4">Uma plataforma simples e acessível para organizações do terceiro setor gerenciarem seus parceiros e cadastros.</p>
          <a href="#/cadastro" class="btn btn-primary btn-lg">Quero participar</a>
        </div>
        <div class="col-md-6 text-center mt-4 mt-md-0">
          <figure class="mb-0">
            <img src="img/equipe-voluntarios.webp" width="1200" height="674"
                 class="img-fluid rounded-4 shadow"
                 alt="Voluntários de várias idades sorrindo enquanto organizam caixas de alimentos, livros e plantas em uma sala clara de centro comunitário">
            <figcaption class="fs-5 mt-3">Juntos somos mais fortes!</figcaption>
          </figure>
        </div>
      </div>
    `
  },
  '/cadastro': {
    titulo: 'Cadastro de Parceiro — ONG Conecta',
    render: () => `
      <div class="row justify-content-center align-items-center g-5">
        <div class="col-md-8 col-lg-6">
          <h1 class="mb-4">Cadastro de Parceiro</h1>
          <p class="text-muted mb-4">Preencha os dados abaixo para fazer parte da nossa rede. Campos com <span class="text-danger" aria-hidden="true">*</span> são obrigatórios.</p>

          <form id="form-cadastro" novalidate>
            <div class="mb-3">
              <label for="nome" class="form-label">Nome completo <span class="text-danger" aria-hidden="true">*</span></label>
              <input type="text" id="nome" name="nome" class="form-control" required aria-required="true" aria-describedby="erro-nome" autocomplete="name">
              <span class="mensagem-erro text-danger small" id="erro-nome" role="alert"></span>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">E-mail <span class="text-danger" aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" class="form-control" required aria-required="true" aria-describedby="erro-email" autocomplete="email">
              <span class="mensagem-erro text-danger small" id="erro-email" role="alert"></span>
            </div>

            <div class="mb-4">
              <label for="telefone" class="form-label">Telefone</label>
              <input type="tel" id="telefone" name="telefone" class="form-control" placeholder="(XX) XXXXX-XXXX" autocomplete="tel">
            </div>

            <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
          </form>

          <div id="area-mensagem" class="mt-4" aria-live="polite"></div>
        </div>

        <div class="col-lg-6 d-none d-lg-block">
          <img src="img/doacoes-comunidade.webp" width="1200" height="674" loading="lazy"
               class="img-fluid rounded-4 shadow"
               alt="Voluntários com coletes coloridos separando alimentos enlatados, cobertores e roupas em caixas de doação, com uma van de entregas ao fundo">
        </div>
      </div>
    `
  },
  '/lista': {
    titulo: 'Parceiros Cadastrados — ONG Conecta',
    render: () => `
      <div>
        <img src="img/rede-parceiros.webp" width="1600" height="899"
             class="banner-rede rounded-4 mb-4"
             alt="Ilustração colorida de pessoas representadas por ícones em círculos, ligadas por linhas luminosas que formam uma rede">
        <h1 class="mb-4">Parceiros da Rede</h1>
        <p class="text-muted mb-4">Pessoas e organizações que fazem parte desta causa.</p>
        <div id="area-lista"></div>
      </div>
    `
  }
};

const conteudoPrincipal = document.getElementById('conteudo-principal');
const menu = document.getElementById('menu');
let primeiraRenderizacao = true;

// Lê a rota atual a partir do hash da URL: "#/cadastro" -> "/cadastro"
function caminhoAtual() {
  return window.location.hash.replace('#', '') || '/';
}

function atualizarLinkAtivo(caminho) {
  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    if (link.getAttribute('href') === `#${caminho}`) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function fecharMenuMobile() {
  if (menu && menu.classList.contains('show') && window.bootstrap) {
    window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }
}

export function inicializarNavegacao() {
  // Dispara sempre que o hash muda (clique em link, botão voltar/avançar, navegarPara)
  window.addEventListener('hashchange', () => renderizarPagina(caminhoAtual()));
  renderizarPagina(caminhoAtual());
}

export function navegarPara(caminho) {
  // Mudar o hash dispara "hashchange", que renderiza a página
  window.location.hash = caminho;
}

function renderizarPagina(caminho) {
  const rota = rotas[caminho];

  if (rota) {
    conteudoPrincipal.innerHTML = rota.render();
    document.title = rota.titulo;
  } else {
    document.title = 'Página não encontrada — ONG Conecta';
    conteudoPrincipal.innerHTML = `
      <div class="text-center py-5">
        <h1>Página não encontrada</h1>
        <p class="text-muted mb-4">O endereço acessado não existe.</p>
        <a href="#/" class="btn btn-primary">Voltar ao início</a>
      </div>
    `;
  }

  atualizarLinkAtivo(caminho);
  fecharMenuMobile();

  // Em trocas de página, leva o foco e a rolagem ao conteúdo (ajuda teclado e leitores de tela)
  if (!primeiraRenderizacao) {
    window.scrollTo(0, 0);
    conteudoPrincipal.focus();
  }
  primeiraRenderizacao = false;

  if (rota) {
    document.dispatchEvent(new CustomEvent('paginaCarregada', { detail: { rota: caminho } }));
  }
}
