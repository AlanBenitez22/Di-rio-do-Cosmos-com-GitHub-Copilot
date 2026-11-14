# Diário do Cosmos com GitHub Copilot

# Instruções do Projeto: Diário do Cosmos (NASA APOD)

Você é um engenheiro de software sênior auxiliando no desenvolvimento da aplicação web **Diário do Cosmos**, que consome a API APOD (Astronomy Picture of the Day) da NASA. Siga rigorosamente todas as diretrizes abaixo em cada resposta.

## 1. Tecnologias Utilizadas
- **Backend (Proxy & Servidor):** Node.js (v18+) com Express (`express`) e `dotenv` para gerenciamento de variáveis de ambiente. Utilize o `fetch` nativo do Node.js (sem instalar `axios` ou `node-fetch`).
- **Frontend:** HTML5 semântico, CSS3 moderno (Grid/Flexbox, variáveis CSS) e JavaScript Vanilla (ES6+).
- **O que NÃO será utilizado:**
  - Não utilize frameworks ou bibliotecas de frontend (React, Vue, Angular, Svelte, jQuery).
  - Não utilize frameworks CSS (Tailwind, Bootstrap, Bulma).
  - Não utilize TypeScript, bundlers (Webpack, Vite) ou transpiladores.
  - Não utilize bancos de dados (a aplicação é stateless).

## 2. Arquitetura do Sistema
O projeto segue o padrão **Backend-for-Frontend (BFF) / Proxy** para proteger credenciais e separar responsabilidades:
- `server.js` (Raiz): Servidor Express responsável por servir os arquivos estáticos da pasta `public/` e expor um único endpoint interno `GET /api/apod`. Ele recebe o parâmetro opcional `?date=YYYY-MM-DD`, valida o formato, consulta `https://api.nasa.gov/planetary/apod` injetando a `NASA_API_KEY` do ambiente, trata erros HTTP da NASA e devolve apenas o JSON limpo ao cliente.
- `public/index.html`: Estrutura semântica única contendo cabeçalho, seletor de data, área de estados (carregamento/erro) e contêiner de exibição (título, data, mídia e explicação).
- `public/style.css`: Estilização responsiva e regras de layout.
- `public/app.js`: Manipulação do DOM, captura de eventos do seletor de data, chamadas `fetch` exclusivas para `/api/apod`, controle de estados visuais (loading/erro) e renderização condicional de mídia (`image` vs `video`).
- `.env` e `.env.example`: Armazenamento da variável `NASA_API_KEY` (o `.env` deve constar no `.gitignore`).

## 3. Estilização do Frontend
- **Tema:** Espacial escuro (*Dark Mode* nativo) com fundo `#0B0D17`, cartões/superfícies em `#15192B`, texto principal em `#F0F4F8`, texto secundário em `#94A3B8` e cor de destaque em `#38BDF8` (azul-ciano).
- **Responsividade (Mobile-First):** O layout deve funcionar sem rolagem horizontal a partir de `320px` de largura até monitores desktop (`1200px+`), utilizando `max-width: 960px` centralizado no desktop.
- **Mídia Adaptativa:**
  - Quando `media_type === "image"`, renderizar tag `<img>` com `max-width: 100%`, bordas arredondadas (`8px`) e atributo `alt` preenchido com o título.
  - Quando `media_type === "video"`, renderizar tag `<iframe>` responsiva com `aspect-ratio: 16 / 9`, `width: 100%` e `allowfullscreen`.
- **Feedback Visual:** Exibir indicador claro de carregamento (spinner ou texto animado) durante requisições e mensagens de erro amigáveis (ex: data futura ou falha na API) ocultando o conteúdo anterior durante falhas.

## 4. Segurança
- **Proteção da API Key:** A chave `NASA_API_KEY` **jamais** pode ser escrita no código-fonte (`server.js` ou arquivos em `public/`). Ela deve ser lida exclusivamente via `process.env.NASA_API_KEY`.
- **Isolamento do Cliente:** O frontend (`public/app.js`) está proibido de fazer requisições diretas para `api.nasa.gov`. Toda comunicação externa ocorre via `server.js`.
- **Validação de Entrada:** O backend deve validar via Regex (`/^\d{4}-\d{2}-\d{2}$/`) se o parâmetro `date` recebido na query string é válido antes de repassá-lo à API da NASA, rejeitando entradas malformadas com status `400`.
- **Sanitização no DOM:** Utilize `textContent` (nunca `innerHTML`) para inserir `title`, `date` e `explanation` vindos da API, prevenindo ataques XSS.