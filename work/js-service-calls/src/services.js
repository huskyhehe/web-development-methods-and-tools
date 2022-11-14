// get /api/session
export function fetchPageLoad() {
    return fetch('/api/session', {
        method: 'GET',
        credentials: 'include',
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then(response => {
        if (!response.ok) {return response.json().then( err => Promise.reject(err) );}
        return response.json();
    })
}

// post /api/session
export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify( { username })
    })
    .catch(err => Promise.reject({ error: 'network-error' }) )
    .then(response => {
        if (!response.ok) { return response.json().then( err => Promise.reject(err) );}
        return response.json();
    })
}

// delete /api/session
export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {return response.json().then( err => Promise.reject(err) );}
        return response.json();
    })
}

// get /api/word
export function fetchWordView() {
    return fetch('./api/word', {
        method: 'GET',
        credentials: 'include',
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then(response => {
        if (!response.ok) {return response.json().then( err => Promise.reject(err) );}
        return response.json();
    })
}

// POST /api/word
export function fetchUpdatedWord(word) {
    return fetch('/api/word', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify( { word })
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then(response => {
        if (!response.ok) {return response.json().then( err => Promise.reject(err) );}
        return response.json();
    })
}