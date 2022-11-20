/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/checkers.js":
/*!*************************!*\
  !*** ./src/checkers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMessagesDataNewest": () => (/* binding */ isMessagesDataNewest),
/* harmony export */   "isOnlineUsersDataNewest": () => (/* binding */ isOnlineUsersDataNewest)
/* harmony export */ });
function isMessagesDataNewest(fetchedMessages, stateMessages) {
  var fetchedLastMessageId = getLastElementKey(fetchedMessages);
  var stateLastMessageId = getLastElementKey(stateMessages);
  return fetchedLastMessageId === stateLastMessageId;
}
function isOnlineUsersDataNewest(fetchedOnlineUsers, stateOnlineUsers) {
  var fetchedLastOnlineUser = getLastElementKey(fetchedOnlineUsers);
  var stateLastOnlineUser = getLastElementKey(stateOnlineUsers);
  return fetchedLastOnlineUser === stateLastOnlineUser && Object.keys(fetchedOnlineUsers).length === Object.keys(stateOnlineUsers).length;
}
function getLastElementKey(jsonData) {
  var arr = Object.keys(jsonData);
  return arr[arr.length - 1];
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  AUTH_IN_USE: "auth-in-use",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_TEXT: "required-text",
  TASK_MISSING: "noSuchId"
};
var CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession"
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, "Trouble connecting to the network.  Please try again"), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, "Your username/password combination does not match any records, please try again."), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, "Please enter a valid (letters and/or numbers) username"), _defineProperty(_MESSAGES, SERVER.REQUIRED_TEXT, "Please enter at least one character to send"), _defineProperty(_MESSAGES, "default", "Something went wrong.  Please try again"), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToSendMessage": () => (/* binding */ addAbilityToSendMessage),
/* harmony export */   "scrollToLatestMessage": () => (/* binding */ scrollToLatestMessage)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login__form")) {
      return;
    }
    var username = appEl.querySelector(".login__username").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnChat)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchOnlineUsers)();
    }).then(function (onlineUsers) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setOnlineUsers)(onlineUsers);
      setTimeout(function () {
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
          state: state,
          appEl: appEl
        });
        scrollToLatestMessage();
      }, 1500);
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
          state: state,
          appEl: appEl
        });
        return;
      }
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("controls__logout")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToSendMessage(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener("submit", function (e) {
    if (!e.target.classList.contains("send__form")) {
      return;
    }
    var text = appEl.querySelector(".send__text").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddMessage)(text).then(function (text) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addMessage)({
        id: text.id,
        text: text
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
      scrollToLatestMessage();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function scrollToLatestMessage() {
  var messagesEl = document.querySelector(".messages");
  if (messagesEl) {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "rerenderMessages": () => (/* binding */ rerenderMessages),
/* harmony export */   "rerenderOnlineUsers": () => (/* binding */ rerenderOnlineUsers)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n        <main>\n            ".concat(generateStatusHtml(state), "\n            ").concat(generateLoginHtml(state), "\n            ").concat(generateContentHtml(state), "\n        </main>\n   ");
  appEl.innerHTML = html;
}
function rerenderMessages(state) {
  var messagesEl = document.querySelector('.messages');
  if (messagesEl) {
    messagesEl.innerHTML = generateMessageListHtml(state);
  }
}
function rerenderOnlineUsers(state) {
  var usersEl = document.querySelector('.users');
  if (usersEl) {
    usersEl.innerHTML = generateOnlineUsernameListHtml(state);
  }
}
function generateStatusHtml(state) {
  if (!state.error) {
    return "";
  }
  return "<div class=\"status\"><p>".concat(state.error, "</p></div>");
}
function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  ;
  if (state.isLoginPending) {
    return "\n            <div class=\"login__waiting\">Loading user...</div>\n        ";
  }
  return "\n        <div class=\"login\">\n            <h2>Login</h2>\n            <form class=\"login__form\" action=\"#/login\">\n                <input class=\"login__username\" placeholder=\"Enter username\" value=\"\">\n                <button class=\"login__button\" type=\"submit\">Login</button>\n            </form>\n        </div>\n    ";
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isChatPending) {
    return "\n            <div class=\"content__waiting\">\n                ".concat(generateControlsHtml(state), "\n                <div class=\"chat__waiting\">Loading Chat...</div>\n            </div>\n        ");
  }
  return "\n        <div class=\"content\">\n            <div class=\"users__container\">\n                <h3>Online Users</h3>\n                <ul class=\"users\">".concat(generateOnlineUsernameListHtml(state), "</ul>\n            </div>\n            <div class=").concat(!state.error ? "messages__container" : "messages__container__with__status", ">\n                ").concat(generateControlsHtml(state), "\n                <ul class=\"messages\">").concat(generateMessageListHtml(state), "</ul>\n                <div class=\"send\">").concat(generateSendMessageHtml(state), "</div>\n            <div>\n        </div>\n    ");
}
function generateControlsHtml(state) {
  return "\n        <div class=\"controls\">\n            <p>Logged in as: <span>".concat(state.username, "</span></p>\n            <button class=\"controls__logout\">Logout</button>\n        </div>\n    ");
}
function generateOnlineUsernameListHtml(state) {
  var loggedInUsernameListHtml = Object.keys(state.onlineUsers).map(function (username) {
    return "\n            <li class=\"online__user\">\n                <span class=\"online__mark\"></span><span class=\"username\">".concat(username, "</span>\n            </li>\n        ");
  }).join('');
  return loggedInUsernameListHtml;
}
function generateMessageListHtml(state) {
  var messageListHtml = Object.values(state.messages).map(function (message) {
    return "\n            <li class=".concat(message.username === state.username ? "user__message" : "other__user__message", ">\n                <p class=\"sender\">").concat(message.username, "</p>\n                <p class=\"text\">").concat(message.text, "</p>\n            </li>\n        ");
  }).join('') || "<p class=\"no__message\">No messages yet</p>";
  return messageListHtml;
}
function generateSendMessageHtml(state) {
  return "\n        <form class=\"send__form\" action=\"#/send\">\n            <input class=\"send__text\">\n            <button type=\"submit\" class=\"send__button\">Send</button>\n        </form>\n    ";
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddMessage": () => (/* binding */ fetchAddMessage),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchOnlineUsers": () => (/* binding */ fetchOnlineUsers),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch("/api/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch("/api/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch("/api/session", {
    method: "DELETE"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchOnlineUsers() {
  return fetch("/api/users", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch("/api/messages", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchAddMessage(text) {
  return fetch("/api/messages", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
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
/* harmony export */   "addMessage": () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setMessages": () => (/* binding */ setMessages),
/* harmony export */   "setOnlineUsers": () => (/* binding */ setOnlineUsers),
/* harmony export */   "waitOnChat": () => (/* binding */ waitOnChat),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  username: "",
  isLoginPending: true,
  isLoggedIn: false,
  isChatPending: false,
  onlineUsers: {},
  messages: {},
  error: ""
};
function waitOnLogin() {
  state.isLoginPending = true;
  state.isLoggedIn = false;
  state.username = "";
  state.onlineUsers = {};
  state.messages = {};
  state.error = "";
}
function login(username) {
  state.username = username;
  state.isLoginPending = false;
  state.isLoggedIn = true;
  state.error = "";
}
function logout() {
  state.username = "";
  state.isLoginPending = false;
  state.isLoggedIn = false;
  state.error = "";
}
function waitOnChat() {
  state.isChatPending = true;
  state.messages = {};
  state.error = "";
}
function setMessages(messages) {
  state.isChatPending = false;
  state.messages = messages;
  state.error = "";
}
function setOnlineUsers(onlineUsers) {
  state.isChatPending = false;
  state.onlineUsers = onlineUsers;
  state.error = "";
}
function addMessage(_ref) {
  var id = _ref.id,
    text = _ref.text;
  state.messages[id] = text;
  state.error = "";
}
function setError(error) {
  if (!error) {
    state.error = "";
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _checkers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkers */ "./src/checkers.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render */ "./src/render.js");






var appEl = document.querySelector("#app");
waitAndCheckForSession();
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
pollNewestChatData();
function waitAndCheckForSession() {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
  (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
  setTimeout(function () {
    return checkForSession();
  }, 1500);
}
function pollNewestChatData() {
  setInterval(checkForUpdates, 5000);
}
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchOnlineUsers)();
  }).then(function (onlineUsers) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setOnlineUsers)(onlineUsers);
    (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_listeners__WEBPACK_IMPORTED_MODULE_3__.scrollToLatestMessage)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
function checkForUpdates() {
  // fetch updates only user is loggedIn and chat is loaded
  if (_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn && !_state__WEBPACK_IMPORTED_MODULE_1__["default"].isChatPending) {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)().then(function (messages) {
      // rerender messagesEl only when new message added
      if (!(0,_checkers__WEBPACK_IMPORTED_MODULE_4__.isMessagesDataNewest)(messages, _state__WEBPACK_IMPORTED_MODULE_1__["default"].messages)) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
        (0,_render__WEBPACK_IMPORTED_MODULE_5__.rerenderMessages)(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
        (0,_listeners__WEBPACK_IMPORTED_MODULE_3__.scrollToLatestMessage)();
      }
      return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchOnlineUsers)();
    }).then(function (onlineUsers) {
      // rerender onlineUsersEl only when other user login or logout
      if (!(0,_checkers__WEBPACK_IMPORTED_MODULE_4__.isOnlineUsersDataNewest)(onlineUsers, _state__WEBPACK_IMPORTED_MODULE_1__["default"].onlineUsers)) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setOnlineUsers)(onlineUsers);
        (0,_render__WEBPACK_IMPORTED_MODULE_5__.rerenderOnlineUsers)(_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
      }
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
    });
  }
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map