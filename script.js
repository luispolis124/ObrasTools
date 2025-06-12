// Alterna o menu no mobile
function toggleMenu() {
  document.querySelector('.menu-items').classList.toggle('show');
}

// Calcular domínio público
function calcularDominio() {
  const nomeObra = document.getElementById('nomeObraDominio').value.trim();
  const anoMorte = parseInt(document.getElementById('anoMorte').value);
  const autor = document.getElementById('nomeAutor').value.trim();
  const resultado = document.getElementById('resultadoDominio');

  if (!autor || isNaN(anoMorte)) {
    resultado.textContent = 'Por favor, preencha pelo menos o nome do autor e o ano da morte corretamente.';
    return;
  }

  const anoAtual = new Date().getFullYear();
  const dominioAno = anoMorte + 70;

  const obraInfo = nomeObra ? ` a obra "${nomeObra}" de` : '';
  const mensagem = anoAtual >= dominioAno
    ? `Sim,${obraInfo} ${autor} está em domínio público desde ${dominioAno}.`
    : `Não,${obraInfo} ${autor} entrará em domínio público em ${dominioAno}.`;

  resultado.textContent = mensagem;
}

// Consulta a API da Wikipedia
async function buscarWikipedia(nome) {
  const endpoint = 'https://pt.wikipedia.org/w/api.php';
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: nome,
    format: 'json',
    origin: '*'
  });
  const res = await fetch(`${endpoint}?${params}`);
  const data = await res.json();
  return data.query.search;
}

// Verifica se a obra existe na Wikipedia
async function verificarObra() {
  const nome = document.getElementById('nomeObra').value.trim();
  const resultado = document.getElementById('resultadoObra');

  if (!nome) {
    resultado.textContent = 'Digite o nome de uma obra.';
    return;
  }

  const hits = await buscarWikipedia(nome);
  if (hits.length > 0 && hits[0].title.toLowerCase() === nome.toLowerCase()) {
    resultado.textContent = `A obra "${nome}" existe na Wikipedia (pt).`;
  } else {
    resultado.textContent = `A obra "${nome}" não foi encontrada na Wikipedia.`;
  }
}

// Verifica se o personagem existe na Wikipedia
async function verificarPersonagem() {
  const nome = document.getElementById('nomePersonagem').value.trim();
  const resultado = document.getElementById('resultadoPersonagem');

  if (!nome) {
    resultado.textContent = 'Digite o nome de um personagem.';
    return;
  }

  const hits = await buscarWikipedia(nome);
  if (hits.length > 0 && hits[0].title.toLowerCase() === nome.toLowerCase()) {
    resultado.textContent = `O personagem "${nome}" existe na Wikipedia (pt).`;
  } else {
    resultado.textContent = `O personagem "${nome}" não foi encontrado na Wikipedia.`;
  }
}

// Listas de obras em domínio público
const obrasEntraram = ["Ursinho Pooh (1926)", "Metropolis (1927)", "Drácula (1897)"];
const obrasEntrarao = ["Pluto (2026)", "Betty Boop (2026)", "Mickey Fantasia (2027)"];

window.onload = () => {
  const listaEntraram = document.getElementById('listaEntraram');
  const listaEntrara = document.getElementById('listaEntrara');

  obrasEntraram.forEach(obra => {
    const li = document.createElement('li');
    li.textContent = obra;
    listaEntraram.appendChild(li);
  });

  obrasEntrarao.forEach(obra => {
    const li = document.createElement('li');
    li.textContent = obra;
    listaEntrara.appendChild(li);
  });
};
