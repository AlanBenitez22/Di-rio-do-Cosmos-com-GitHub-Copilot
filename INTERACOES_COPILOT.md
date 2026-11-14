# Registro de Interações com o GitHub Copilot

Este documento registra as cinco principais etapas de desenvolvimento do **Diário do Cosmos**, avaliando a aderência do GitHub Copilot às regras definidas em `.github/copilot-instructions.md`.

---

## Interação 1: Criação do Backend Proxy em Node.js (`server.js`)
* **O que foi pedido:** *"Crie o arquivo `server.js` seguindo a arquitetura e as regras de segurança definidas em `.github/copilot-instructions.md`, expondo a rota `GET /api/apod`."*
* **O que o Copilot respondeu:** Gerou um servidor Express configurando `dotenv`, servindo a pasta `public/` e criando a rota `/api/apod` utilizando `fetch` nativo e validação de data via Regex.
* **O que foi alterado / verificado:** O Copilot inicialmente deixou um fallback `'DEMO_KEY'` caso `process.env.NASA_API_KEY` estivesse vazio (`process.env.NASA_API_KEY || 'DEMO_KEY'`). Conforme a seção **4. Segurança** das instruções, removi o fallback e adicionei uma verificação explícita que encerra o servidor (`process.exit(1)`) caso a variável de ambiente não esteja configurada, garantindo que nenhuma chave padrão fique exposta no código.

---

## Interação 2: Estrutura Semântica do Frontend (`public/index.html`)
* **O que foi pedido:** *"Crie o `public/index.html` com cabeçalho, seletor de data e contêineres para estado de carregamento, erro e exibição do APOD, sem usar frameworks."*
* **O que o Copilot respondeu:** Gerou HTML5 limpo e semântico com `<header>`, `<main>`, `<article>`, `<time>` e `<input type="date">`, importando apenas `style.css` e `app.js`.
* **O que foi alterado / verificado:** O Copilot seguiu as instruções sobre ausência de bibliotecas externas. Adicionei manualmente o atributo `min="1995-06-16"` no `<input type="date">` (data da primeira publicação histórica do APOD da NASA) e os atributos ARIA `role="status"` e `role="alert"` nas caixas de feedback para melhorar a acessibilidade.

---

## Interação 3: Estilização Responsiva e Dark Mode (`public/style.css`)
* **O que foi pedido:** *"Crie o `public/style.css` aplicando a paleta espacial escura, responsividade mobile-first e suporte a imagens e vídeos em proporção 16:9."*
* **O que o Copilot respondeu:** Gerou o CSS utilizando variáveis `:root` exatamente com os códigos hexadecimais especificados (`#0B0D17`, `#15192B`, `#38BDF8`) e regras de mídia fluida.
* **O que foi alterado / verificado:** Para o `<iframe>` de vídeo, o Copilot sugeriu inicialmente uma altura fixa (`height: 450px`), o que quebrava a proporção em telas de celular. Substituí por `aspect-ratio: 16 / 9; width: 100%;` conforme exigido na seção **3. Estilização do Frontend** das instruções, além de adicionar `color-scheme: dark` ao `input[type="date"]` para que o calendário nativo do navegador combinasse com o tema escuro.

---

## Interação 4: Lógica de Consumo da API e Renderização (`public/app.js`)
* **O que foi pedido:** *"Implemente `public/app.js` para buscar `/api/apod`, controlar os estados de loading e erro, e renderizar dinamicamente imagem ou vídeo."*
* **O que o Copilot respondeu:** Gerou as funções assíncronas com `fetch('/api/apod')`, manipulação de classes `.hidden` e criação dinâmica de `<img>` ou `<iframe>` conforme `media_type`.
* **O que foi alterado / verificado:** Na primeira versão gerada, o Copilot utilizou `cardEl.innerHTML = ...` para montar o título e a explicação. Para cumprir a regra de sanitização XSS da seção **4. Segurança**, refatorei o trecho para atribuir os textos via `textContent` em elementos dedicados e defini `datePicker.max` dinamicamente para a data atual no fuso local, evitando que o usuário selecione datas futuras por padrão.

---

## Interação 5: Tratamento de Casos de Borda (Vídeos e Datas Inválidas)
* **O que foi pedido:** *"Teste e ajuste o tratamento de erros quando a NASA retorna um vídeo (ex: data `2024-04-08`) ou quando o usuário tenta buscar uma data sem registro."*
* **O que o Copilot respondeu:** Sugeriu adicionar um bloco `else` na função `renderMedia` para tipos de mídia desconhecidos (como `"other"`, que ocorre ocasionalmente no APOD) e repassar a mensagem `data.msg` retornada pela NASA no status HTTP de erro.
* **O que foi alterado / verificado:** Testei com datas conhecidas de vídeo (como `2024-04-08`, eclipse solar) e datas futuras. O fluxo funcionou conforme as instruções, ocultando o cartão anterior sempre que uma nova requisição falha para não exibir dados desatualizados junto à mensagem de erro.