require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY;

if (!NASA_API_KEY) {
  console.error('ERRO: A variável de ambiente NASA_API_KEY não está definida.');
  process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/apod', async (req, res) => {
  const { date } = req.query;

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD.' });
  }

  try {
    const url = new URL('https://api.nasa.gov/planetary/apod');
    url.searchParams.append('api_key', NASA_API_KEY);
    if (date) {
      url.searchParams.append('date', date);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.msg || 'Erro ao consultar a API da NASA.'
      });
    }

    return res.json({
      title: data.title,
      date: data.date,
      media_type: data.media_type,
      url: data.url,
      explanation: data.explanation,
      copyright: data.copyright || null
    });
  } catch (error) {
    console.error('Erro na requisição APOD:', error);
    return res.status(500).json({ error: 'Falha interna ao buscar a imagem astronômica.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
