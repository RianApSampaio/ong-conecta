# 🤝 ONG Conecta — Plataforma de Apoio ao Terceiro Setor

Aplicação web de página única (SPA) desenvolvida como projeto prático de Desenvolvimento Front-End, com foco em acessibilidade, organização de código e boas práticas.

---

## 🚀 Tecnologias

- **HTML5** — estrutura semântica
- **CSS3 + Bootstrap 5 (via CDN)** — estilos e responsividade
- **JavaScript ES6+ (módulos)** — lógica separada por responsabilidade
- **localStorage** — persistência de dados no navegador
- **Boas práticas de acessibilidade (WCAG 2.1)** — rótulos associados, mensagens de erro anunciadas por leitores de tela, foco visível e navegação por teclado
- **GitFlow** — padrão de versionamento

---

## ▶️ Como Usar

Como o projeto usa módulos ES (`type="module"`), ele **não funciona abrindo o `index.html` com duplo clique**. É preciso um servidor local:

1. Baixe ou clone o repositório
2. Inicie um servidor na pasta do projeto, usando uma das opções:
   - **VS Code:** extensão *Live Server* → clique em "Go Live"
   - **Python:** `python -m http.server 8000` e acesse `http://localhost:8000`
3. Ou acesse a versão publicada: `https://github.com/RianApSampaio/Projeto-SPA`

---

## ✨ Funcionalidades

- Navegação sem recarregar a página (rotas por hash: `#/`, `#/cadastro`, `#/lista`)
- Cadastro de parceiros com validação de nome e e-mail (ao sair do campo e ao enviar)
- Mensagens de erro visíveis e anunciadas por leitores de tela
- Lista de parceiros salva no navegador (permanece após fechar e reabrir)
- Remoção de parceiros com confirmação
- Layout responsivo para celular
- Navegação por teclado, com foco movido ao conteúdo a cada troca de página
- Link ativo do menu indicado com `aria-current`

---

## 📂 Estrutura

.
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── css/
│   └── estilos.css
└── js/
    ├── main.js            # ponto de entrada; liga formulário e páginas
    ├── navegacao.js       # rotas por hash e renderização das páginas
    ├── validacao.js       # regras de validação e exibição de erros
    ├── armazenamento.js   # leitura e escrita no localStorage
    └── templates.js       # renderização da lista de parceiros

---

## ⚠️ Limitações conhecidas

- Os dados ficam apenas no navegador de quem usa (localStorage); não há servidor nem banco de dados.
- Não foi feita uma auditoria formal de acessibilidade; recomenda-se testar com leitor de tela e ferramentas como Lighthouse ou axe.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE).
