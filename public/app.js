const datePicker = document.getElementById('date-picker');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const cardEl = document.getElementById('apod-card');
const titleEl = document.getElementById('apod-title');
const dateEl = document.getElementById('apod-date');
const mediaContainer = document.getElementById('media-container');
const copyrightEl = document.getElementById('apod-copyright');
const explanationEl = document.getElementById('apod-explanation');

const today = new Date().toLocaleDateString('en-CA');
datePicker.max = today;
datePicker.value = today;

function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  cardEl.classList.add('hidden');
}

function showError(message) {
  loadingEl.classList.add('hidden');
  cardEl.classList.add('hidden');
  errorMessageEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function renderMedia(data) {
  mediaContainer.replaceChildren();

  if (data.media_type === 'image') {
    const img = document.createElement('img');
    img.src = data.url;
    img.alt = data.title;
    img.loading = 'lazy';
    mediaContainer.appendChild(img);
  } else if (data.media_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.src = data.url;
    iframe.title = data.title;
    iframe.allowFullscreen = true;
    mediaContainer.appendChild(iframe);
  } else {
    const fallback = document.createElement('p');
    fallback.textContent = `Formato de mídia não suportado diretamente. Acesse o link original: ${data.url}`;
    mediaContainer.appendChild(fallback);
  }
}

async function fetchApod(selectedDate = '') {
  showLoading();

  try {
    const endpoint = selectedDate
      ? `/api/apod?date=${encodeURIComponent(selectedDate)}`
      : '/api/apod';
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar dados da NASA.');
    }

    titleEl.textContent = data.title;
    dateEl.textContent = data.date;
    explanationEl.textContent = data.explanation;

    if (data.copyright) {
      copyrightEl.textContent = `Créditos: ${data.copyright}`;
      copyrightEl.classList.remove('hidden');
    } else {
      copyrightEl.classList.add('hidden');
    }

    renderMedia(data);

    loadingEl.classList.add('hidden');
    cardEl.classList.remove('hidden');
  } catch (err) {
    showError(err.message);
  }
}

datePicker.addEventListener('change', (event) => {
  if (event.target.value) {
    fetchApod(event.target.value);
  }
});

fetchApod();
