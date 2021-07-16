
const photos = document.querySelector('#photos');//ul
const pagination = document.querySelector('#pagination');//div
const photoItemTemplate = document.querySelector("#photoTemplate").innerHTML;

const PHOTOS_URL = `https://jsonplaceholder.typicode.com/photos?_limit=100`;

let photoList = [];

pagination.addEventListener(`click`, onPagesClick);

function onPagesClick(e) {
  if (e.target.classList.contains(`page`)) {
    getAlbumPhotos(e.target.id);
    savePageToLocalStorage(e.target.id);
  }
}

init();

function init() {
  getPhotos().then(getFirstAlbumPhotos)
             .then(restorePageFromLocalStorage);
}


function getPhotos() {
  return fetch(PHOTOS_URL)
    .then((resp) => resp.json())
    .then((data) => (photoList = data))
    .then((data) => {
      getPagination(data);
      return data;
    });
}

function getPagination(photoList) {
  let pgs = photoList.length / 50;
  for (let index = 1; index <= pgs; index++) {
    createPagination(index);
  }
}

function createPagination(index) {
 let num = document.createElement('p');
 num.className = `page`; 
 num.innerHTML = index;
 num.id = index;
 pagination.appendChild(num);
}

function renderPhotos(list) {
  photos.innerHTML = ``;
  list.forEach((item) => renderPhoto(item));
}

function renderPhoto(photo) {
  const foto = document.createElement('li'); 
  const img = document.createElement('img');
  img.alt = photo.title;
  img.src = photo.thumbnailUrl; 
  foto.appendChild(img);
  photos.appendChild(foto);
}

function getFirstAlbumPhotos(data) {
  if (data.length) {
    getAlbumPhotos(data[0].id);
  }
}

function getAlbumPhotos(number) {
  let newPhotoList = photoList.filter((item) => item.albumId === +number);
  renderPhotos(newPhotoList);
}

function savePageToLocalStorage(pageId) {
  localStorage.setItem(`pageId`, JSON.stringify(pageId));
}

function restorePageFromLocalStorage() {
  const data = localStorage.getItem(`pageId`);
  if (data !== null) {
    getAlbumPhotos(JSON.parse(data));
  }
}









// const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

// const photosEl = document.querySelector('#photos');//div
// const pages = 10;
// const pagination = document.querySelector('#pagination');//ul

// const photoItemTemplate = document.querySelector('#photoTemplate').innerHTML;

// init();

// function init() {
//     getPhotos().then(renderData);
// }

// function getPhotos() {
//     return fetch(PHOTOS_URL)
//         .then(resp => resp.json())
//         .then(data => {
//             // renderPhotos(data);
//             return data;
//         });
// }

// function renderPhotos(data) {
//     photosEl.innerHTML = data
//         .map((photo) => generatorPhotoHTML(photo))
//         .join('\n');
// }

// function generatorPhotoHTML(photo) {
//         return photoTemplate
//         .replace('{{url}}', photo.thumbnailUrl)
//         .replace('{{title}}', photo.title);
// }
//  function renderData(arr){
//      let pgn = getPagination(arr);
//      renderPagination(pgn);
//      renderContent(arr, pgn)
//  }

//  function getPaginationItemHtml(index) {
//     return '<li class="page">{{number}}</li>'.replace('{{number}}', index);
//   }
  
//   function renderPagination(pgn) {
//     for (let index = 0; index < pgn.getPagesNumber(); index++) {
//       pagination.insertAdjacentHTML(
//         'beforeend',
//         getPaginationItemHtml(index + 1)
//       );
//     }
//   }
  
//   function getPagination(arr) {
//     return new Pagination(pages, arr.length, 1);
//   }

//   function renderContent(arr, pgn) {
//     pgn.setActivePageNumber(2)
//     let photos = arr.slice(
//       pgn.getActivePageNumber() - 1,
//       pgn.getPageSize()
//     );
//     renderPhotos(photos);
//   }


//   class Pagination {
//     constructor(pageSize, listLenght, activePageNumber) {
//       this.pageSize = pageSize;
//       this.listLenght = listLenght;
//       this.activePageNumber = activePageNumber;
//     }
//     getPagesNumber() {
//       return Math.ceil(this.listLenght / this.pageSize);
//     }
//     getPageSize() {
//       return this.pageSize;
//     }
  
//     getActivePageNumber() {
//       return this.activePageNumber;
//     }
  
//     setActivePageNumber(activePageNumber) {
//       this.activePageNumber = activePageNumber;
//     }
//   }

















// const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
// const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

// const ALBUM_ITEM_CLASS = 'album-item';

// const albumsEl = document.querySelector('#albums');
// const photosEl = document.querySelector('#photos');

// const albumItemTemplate =
//     document.querySelector('#albumItemTemplate').innerHTML;
// const photoItemTemplate =
//     document.querySelector('#photoItemTemplate').innerHTML;

// init();

// function init() {
//      getAlbums().then(getFirstAlbumPhotos);
// }

// function getPhotos(albumId) {
//     return fetch(getPhotosUrl(albumId))
//         .then((resp) => resp.json())
//         .then(renderPhotos);
// }

// function getPhotosUrl(albumId) {
//     return PHOTOS_URL.replace('{{id}}', albumId);
// }

// function renderPhotos(data) {
//     photosEl.innerHTML = data
//         .map((photo) => generatePhotoHtml(photo))
//         .join('\n');
// }

// function generatePhotoHtml(photo) {
//     return photoItemTemplate
//         .replace('{{url}}', photo.thumbnailUrl)
//         .replace('{{title}}', photo.title);
// }


// albumsEl.addEventListener('click', onAlbumsClick);

// function onAlbumsClick(e) {
//     if (e.target.classList.contains(ALBUM_ITEM_CLASS)) {
//         getPhotos(e.target.dataset.id);
//     }
// }


// function getAlbums() {
//     return fetch(ALBUMS_URL)
//         .then(resp => resp.json())
//         .then(data => {
//             renderAlbums(data);
//             return data;
//         });
// }

// function renderAlbums(data) {
//     albumsEl.innerHTML = data.map(album => generateAlbumHtml(album)).join('\n');
// }

// function generateAlbumHtml(album) {
//     return albumItemTemplate
//         .replace('{{id}}', album.id)
//         .replace('{{title}}', album.title);
// }

// function getFirstAlbumPhotos(data) {
//     if (data.length) {
//         getPhotos(data[0].id);
//     }
// }


