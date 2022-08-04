const API = 'https://spotify23.p.rapidapi.com';

const API_TRACK = (id) => `${API}/playlist_tracks/?id=${id}&offset=0&limit=10`;
const API_SEARCH = (id) => `${API}/search/?q=${id}&type=playlists&offset=0&limit=10&numberOfTopResults=5`;

const content = null || document.getElementById('content');
// valor a la referencia de un elemento HTML donde vamos 
// a agregar la iteración de la petición que vamos a hacer a la API

const contentInput = document.getElementById('content_input');

const divPlaylist = document.querySelectorAll('divPlaylist');

const options = {
  method: 'GET',
  // mode: 'cors',
  // credentials: 'include',
  headers: {
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Origin': 'instagram130.p.rapidapi.com',
    'X-RapidAPI-Key': 'c6e6df5056msh4b6786b32ff8717p12b71ajsn456043ea61af',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  console.log('DATA',data);
  console.log(response.status);
  return data;
};

content.addEventListener('click', (event) => {
  console.log(event);
  if (event.target.className == 'buttonPlaylist') {
    promiseTrack(event.target.id)
  }
});

async function promiseTrack(param) {
  try {
    const playlisTracks = await fetchData(API_TRACK(param));
    let track = `
      ${playlisTracks.items.map(element => `
      <div>
      <audio controls class='buttonPlaylist-data'> 
        <source src='${element.track.preview_url}' type='audio/mpeg'
      </audio>
      <h2>${element.track.name}</h2>
      </div>`
      )}
      `;
    // let track = playlisTracks.items.map(element => {
      // const article = document.createElement('article');

      // const audio = document.createElement('audio');
      // audio.src = element.track.preview_url;
      // audio.play;

      // const h2 = document.createElement('h2');
      // const h2Text = document.createTextNode(`${element.track.name}`);

      // h2.appendChild(h2Text);
      // section.appendChild(h2);

      // article.appendChild(audio);
      // article.appendChild(h2);

      // divPlaylist.appendChild(track);
    // });
    content.innerHTML = track;
      }catch (error) {
        console.log(error);
      }
    };

async function promiseSearch() {
  try {
    const items = await fetchData(API_SEARCH(contentInput.value));
    
    let view = `
    ${items.playlists.items.map(post => `
    <div class='section1_playlist-data'>
    <img src='${post.data.images.items[0].sources[0].url}' alt='${post.data.owner.name}' class='section1_info-img'>
    <h2>${post.data.name}</h2>
    <span>${post.data.description}</span>
    <button id='${(post.data.uri).slice(17,39)}' class='buttonPlaylist'>Escuchar ahora</button>
    <div class='divPlaylist'></div>
    </div>`
    )}
    `;
    content.innerHTML = view;
  }catch (error) {
    console.log(error);
  }
};
// con esto tenemos la sentencia que va a permitir automaticamente cuando
// esté cargando este archivo, cargar la función 
