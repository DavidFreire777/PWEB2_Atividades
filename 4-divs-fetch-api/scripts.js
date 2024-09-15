const urls = [
  'https://api.kanye.rest/',
  'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3',
  'https://anapioficeandfire.com/api//books/1',
  'https://api.spaceflightnewsapi.net/v4/articles/4/'
];

let apiCarregada = false;
const secao1 = document.querySelector('#section1');
const secao2 = document.querySelector('#section2');
const secao3 = document.querySelector('#section3');
const secao4 = document.querySelector('#section4');
const buttonApis = document.querySelector('#Apis');
const status = document.querySelectorAll('.status');

// Função para obter as APIs
async function getApis(url) {
  if (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar a API: ', error);
      return null;
    }
  } else {
    return null; 
  }
}

// Função para obter os dados de todas as APIs
async function getApisData() {
  try {
    // Executa todas as requisições em paralelo
    const [dadosApi1, dadosApi2, dadosApi3, dadosApi4] = await Promise.all(urls.map(getApis));

    // Obter dados da API 1 (Citações)
    if (dadosApi1){
      const titQuoteR = document.createElement('h2');
      const titQuote = document.createElement('p');
      
        
      titQuoteR.innerText = 'Citações aleatórias';
      titQuote.innerText = "'"+dadosApi1.quote + "'";
      
      
      secao1.appendChild(titQuoteR);
      secao1.appendChild(titQuote);
      
    }

    // Obter dados da API 2 (Veículos)
    if (dadosApi2) {
      const titV = document.createElement('h2');
      const marca = document.createElement('p');
      const modelo = document.createElement('p');
      
      titV.innerText = 'Veículos';
      marca.innerText = 'Marca: '+ dadosApi2.Marca;
      modelo.innerText = 'Modelo: '+ dadosApi2.Modelo;
      
      secao2.appendChild(titV);
      secao2.appendChild(marca);
      secao2.appendChild(modelo);
    }

    // Obter dados da API 3 (Livros)
    if (dadosApi3) {
      const titApi3 = document.createElement('h2');
      const nome = document.createElement('p');
      const autores= document.createElement('p');
      const numerosPaginas = document.createElement('p');
      
      nome.innerText = "Nome: "+ dadosApi3.name;
      autores.innerText = "Autores: " +  dadosApi3.authors;
      numerosPaginas.innerText="Números de páginas: "+ dadosApi3.numberOfPages;
      titApi3.innerText = 'Livro 1';
      
      secao3.appendChild(titApi3);
      secao3.appendChild(nome);
      secao3.appendChild(autores);
      secao3.appendChild(numerosPaginas);
      
    }

    // Obter dados da API 4 (Notícias Espaciais)
    if (dadosApi4) {
      const titApi4 = document.createElement('h2');
      const titNews = document.createElement('p');
      const newsSite = document.createElement('p');
      const published = document.createElement('p');
      const updated = document.createElement('p');
      titApi4.innerText = 'Nóticias espaciais'
      titNews.innerText = 'Titulo : ' + dadosApi4.title;
      newsSite.innerText = 'Site: '+ dadosApi4.news_site;
      published.innerText = 'Data de publicação: '+ dadosApi4.published_at;
      updated.innerText = 'Última atualização: '+ dadosApi4.updated_at;
      
      secao4.appendChild(titApi4);
      secao4.appendChild(titNews);
      secao4.appendChild(newsSite);
      secao4.appendChild(published);
      secao4.appendChild(updated);
      
    }

  } catch (error) {
    console.error('Erro ao manipular os dados:', error);
  }
}


// Função principal para carregar todas as APIs
function carregarApis() {
  
  if(!apiCarregada){
    status.forEach(s => s.innerText = "");
    apiCarregada = true;
    getApisData();
    
  }
}

// Iniciação das APIs
buttonApis.addEventListener('click', carregarApis);
