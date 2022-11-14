/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES)
/* harmony export */ });
var MESSAGES = {
  'network-error': "Server unavailable, please try again",
  'auth-missing': "Auth unavailable, please login again",
  'required-username': "Username should only contain letters and at least one letter, please try again",
  'auth-insufficient': "Username dog has insufficient auth, please login using other username",
  'required-word': "Word should have at least one character, please try again",
  'invalid-word': "Word should only contain letters, please try again",
  "default": "Something went wrong, please try again"
};

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchPageLoad": () => (/* binding */ fetchPageLoad),
/* harmony export */   "fetchUpdatedWord": () => (/* binding */ fetchUpdatedWord),
/* harmony export */   "fetchWordView": () => (/* binding */ fetchWordView)
/* harmony export */ });
// get /api/session
function fetchPageLoad() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// post /api/session
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// delete /api/session
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// get /api/word
function fetchWordView() {
  return fetch('./api/word', {
    method: 'GET',
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// POST /api/word
function fetchUpdatedWord(word) {
  return fetch('/api/word', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "state": () => (/* binding */ state)
/* harmony export */ });
var state = {
  activeUser: null
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/site.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages */ "./src/messages.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");





(function () {
  var appEl = document.querySelector('#memo-app');
  appEl.addEventListener('submit', function (e) {
    if (e.target.classList.contains('login-form')) {
      e.preventDefault();
      var username = document.querySelector('.username-input').value;
      login(username);
      return;
    }
    if (e.target.classList.contains('update-form')) {
      e.preventDefault();
      var newWord = document.querySelector('.word-input').value;
      updateWord(newWord);
      return;
    }
  });
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('logout-btn')) {
      logout();
      return;
    }
  });
  loadPage();
  function loadPage() {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchPageLoad)().then(function () {
      return getWordView();
    })["catch"](function (err) {
      if (err.error === "auth-missing") {
        renderLogin();
        return;
      }
      updateStatusEl(err.error);
    });
  }
  function login(username) {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function () {
      return getWordView();
    })["catch"](function (err) {
      updateStatusEl(err.error);
      document.querySelector('.username-input').value = '';
    });
  }
  function getWordView() {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchWordView)().then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.activeUser = data;
      renderWordView(_state__WEBPACK_IMPORTED_MODULE_0__.state.activeUser);
    })["catch"](function (err) {
      if (err.error === "auth-missing") {
        renderLogin();
      }
      updateStatusEl(err.error);
    });
  }
  function updateWord(newWord) {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUpdatedWord)(newWord).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.activeUser = data;
      renderWordView(_state__WEBPACK_IMPORTED_MODULE_0__.state.activeUser);
    })["catch"](function (err) {
      if (err.error === "auth-missing") {
        renderLogin();
      }
      updateStatusEl(err.error);
      document.querySelector('.word-input').value = '';
    });
  }
  function logout() {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
      return renderLogin();
    })["catch"](function (err) {
      return;
    });
  }
  function updateStatusEl(message) {
    var statusEl = document.querySelector('.status');
    statusEl.innerHTML = _messages__WEBPACK_IMPORTED_MODULE_1__.MESSAGES[message] || _messages__WEBPACK_IMPORTED_MODULE_1__.MESSAGES["default"];
  }
  function renderLogin() {
    appEl.innerHTML = "\n            <div class=\"status\"></div>\n            <h1>Login</h1>\n            <form action=\"/api/session\" method=\"post\" class=\"login-form\">\n                <input type=\"text\" name=\"username\" class=\"username-input\" placeholder=\"Enter username\" />\n                <button type=\"submit\" class=\"login-btn\">Login</button>\n            </form>  \n        ";
  }
  function renderWordView(user) {
    appEl.innerHTML = "\n            <div class=\"status\"></div>\n            <h1>Welcome to Memo</h1>\n            <div class=\"user-info\">\n                <span>Logged in as: </span>\n                <span class=\"username\">".concat(user.username, "</span>\n            </div>\n            <div class=\"stored-word\">\n                <span>Stored Word: </span>\n                <span class=\"word\">").concat(user.storedWord, "</span>\n            </div>\n            <form action=\"/api/word\" method=\"post\" class=\"update-form\">\n                <input type=\"text\" name=\"word\" class=\"word-input\" placeholder=\"Update stored word\"/>\n                <button class=\"update-btn\" type=\"submit\">Update</button>\n            </form>\n            <button type=\"button\" class=\"logout-btn\">Logout</button>\n        ");
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=site.js.map