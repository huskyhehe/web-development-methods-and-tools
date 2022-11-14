"use strict";
( function() {

  let names = [];

  const connectEl = document.querySelector('.connect');
  connectEl.addEventListener('click', () => {
    updateCats();
  });
  const listEl = document.querySelector('.example');
  const status = document.querySelector('.status');

  function updateCats() {

    listEl.innerHTML = '';

    fetch('/dogs')
    .catch( () => Promise.reject({ error: 'network' }) )
    .then( response => {
      if(response.ok) { return response.json(); }
      // This example service sends JSON error bodies
      return response.json().then(err => Promise.reject(err) );
    })
    .then( cats => {
      names = cats;
      render();
    })
    .catch( err => status.innerText = err.error );
  }

  function render() {
    listEl.innerHTML = names.map(
      name => `<li>${name}</li>`
    ).join('')
  }

})();
