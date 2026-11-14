require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY;

if (!NASA_API_KEY || NASA_API_KEY.trim() === '' || NASA_API_KEY === 'sua_chave_aqui') {
  console.error('ERRO: Configure uma NASA_API_KEY válida no arquivo .env. Obtenha uma chave gratuita em https://api.nasa.gov/.');
  process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/apod', async (req, res) => {
  const { date } = req.query;

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD.' });
  }

  try {
    const url = new URL('https://science.nasa.gov/wp-json/wp/v2/apod-basic');
    url.searchParams.append('api_key', NASA_API_KEY);
    if (date) {
      url.searchParams.append('date', date);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      const nasaError = typeof data.error === 'string'
        ? data.error
        : data.error?.message || data.message || data.msg;
      return res.status(response.status).json({
        error: nasaError || `A API da NASA respondeu com erro (HTTP ${response.status}).`
      });
    }

    const apodEntries = Array.isArray(data) ? data : [data];
    const apod = date
      ? apodEntries.find((entry) => entry.date === date)
      : apodEntries[0];

    if (!apod) {
      return res.status(404).json({
        error: 'A API da NASA não retornou conteúdo para a data selecionada.'
      });
    }

    return res.json({
      title: apod.title,
      date: apod.date,
      media_type: apod.media_type,
      url: apod.media_type === 'image' ? apod.hdurl || apod.url : apod.url,
      explanation: apod.explanation,
      copyright: apod.copyright || null
    });
  } catch (error) {
    console.error('Erro na requisição APOD:', error);
    return res.status(500).json({ error: 'Falha interna ao buscar a imagem astronômica.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
