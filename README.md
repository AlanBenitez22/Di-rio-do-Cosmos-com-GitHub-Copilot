# Diário do Cosmos — NASA APOD

Aplicação web responsiva que exibe a **Imagem Astronômica do Dia (APOD)** utilizando a API oficial da NASA, desenvolvida com apoio do **GitHub Copilot** orientado por instruções arquiteturais e de segurança.

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