"use strict";

( function() {

    // const list = document.querySelector('.example');
    // fetch('/cats')
    // .then( response => response.json() )
    // .then( cats => {
    //     const names = cats.map(
    //     name => `<li>${name}</li>`
    //     ).join('')
    //     list.innerHTML = names;
    // });

    let names = [];

    const connectEl = document.querySelector('.connect');
    connectEl.addEventListener('click', () => {
        updateCats();
    });

    const listEl = document.querySelector('.example');
    const status = document.querySelector('.status');

    function updateCats() {
        listEl.innerHTML = '';

        fetch('/don')
        .catch( () => Promise.reject({error: 'network'}) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            // This example service sends JSON error bodies
            return response.json().then(err => Promise.reject(err));
        })
        .then( cats => {
            names = cats; // update state
            render();
        })
        .catch( err => status.innerText = err.error);
    }

    // function updateCats() {
    //     listEl.innerHTML = '';

    //     fetch('/don')
    //     .catch( () => {
    //         console.log('network error');
    //         return Promise.reject('poop');
    //     })
    //     .then( response => {
    //         if (response.ok) {
    //             return response.json() 
    //         }
    //         console.log('Not ok', response.status);
    //         return Promise.reject('drool');
    //     })
    //     .then( cats => {
    //         names = cats; // update state
    //         render();
    //     });
    // }

    function render() {
        listEl.innerHTML = names.map(
        name => `<li>${name}</li>`
        ).join('')
    }
    
})();

