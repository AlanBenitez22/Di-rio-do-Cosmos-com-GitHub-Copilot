# Diário do Cosmos — NASA APOD

Aplicação web responsiva que exibe a **Imagem Astronômica do Dia (APOD)** utilizando o endpoint APOD Basic da NASA, desenvolvida com apoio do **GitHub Copilot** orientado por instruções arquiteturais e de segurança.

## Funcionalidades
- Exibição automática do APOD do dia atual (título, data, créditos, mídia e explicação).
- Seletor de data histórico (a partir de `16/06/1995`, início do acervo APOD).
- Suporte nativo tanto para fotografias (`image`) quanto para vídeos incorporados (`video`).
- Indicadores visuais de carregamento e tratamento amigável de erros.
- Interface responsiva (*Dark Mode* espacial) adaptada para dispositivos móveis e desktops.
- **Segurança:** Arquitetura proxy em Node.js que mantém a `NASA_API_KEY` estritamente no servidor, sem exposição no repositório ou no navegador do cliente.

## Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- Uma chave gratuita da API da NASA, obtida em [api.nasa.gov](https://api.nasa.gov/).

## Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:AlanBenitez22/Di-rio-do-Cosmos-com-GitHub-Copilot.git
   cd Di-rio-do-Cosmos-com-GitHub-Copilot
   ```
2. **Configure a chave da NASA:** copie `.env.example` para `.env` e substitua `sua_chave_aqui` por uma chave obtida em [api.nasa.gov](https://api.nasa.gov/). O valor de exemplo não autentica chamadas à API.
3. **Instale as dependências e inicie o servidor:**
   ```bash
   npm install
   npm start
   ```
4. Acesse `http://localhost:3000`. Se alterar a chave ou a porta, reinicie o servidor.