/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/products.js":
/*!*************************!*\
  !*** ./src/products.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var products = [{
  id: "1",
  name: "Gray Fluffball",
  img: "http://placekitten.com/150/150?image=1",
  price: 0.99
}, {
  id: "4",
  name: "Yellow and White",
  img: "http://placekitten.com/150/150?image=4",
  price: 3.14
}, {
  id: "7",
  name: "Lion face",
  img: "http://placekitten.com/150/150?image=7",
  price: 2.73
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (products);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addItemToCart": () => (/* binding */ addItemToCart),
/* harmony export */   "deleteItemFromCart": () => (/* binding */ deleteItemFromCart),
/* harmony export */   "getSubtotalPrice": () => (/* binding */ getSubtotalPrice),
/* harmony export */   "getTotalPrice": () => (/* binding */ getTotalPrice),
/* harmony export */   "goToCheckout": () => (/* binding */ goToCheckout),
/* harmony export */   "state": () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products */ "./src/products.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var state = {
  cart: [],
  // cart = [item1, item2, ...], item data schema: item = {id, productId, quantity}
  cartShown: false
};
function addItemToCart(productId, cart) {
  var item = cart.find(function (item) {
    return item.productId === productId;
  });
  if (item === undefined) {
    var id = 1000 + productId;
    cart.push({
      id: id,
      productId: productId,
      quantity: 1
    });
  } else {
    item.quantity = item.quantity + 1;
  }
}
function deleteItemFromCart(item, cart) {
  cart.splice(cart.indexOf(item), 1);
}
function getSubtotalPrice(item) {
  var eachPrice = _products__WEBPACK_IMPORTED_MODULE_0__["default"].find(function (product) {
    return product.id === item.productId;
  }).price;
  return parseFloat((eachPrice * item.quantity).toFixed(2));
}
function getTotalPrice(cart) {
  var total = 0;
  var _iterator = _createForOfIteratorHelper(cart),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      total += getSubtotalPrice(item);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return parseFloat(total.toFixed(2));
}
function goToCheckout(cart) {
  cart.length = 0;
}

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
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products */ "./src/products.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");




(function () {
  var appEl = document.querySelector('#shop-app');
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains("add-btn")) {
      var productId = e.target.dataset.id;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addItemToCart)(productId, _state__WEBPACK_IMPORTED_MODULE_1__.state.cart);
      render();
      return;
    }
    if (e.target.classList.contains('cart-btn')) {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.cartShown = !_state__WEBPACK_IMPORTED_MODULE_1__.state.cartShown;
      render();
      return;
    }
    if (e.target.classList.contains("decrement-btn")) {
      var itemId = e.target.dataset.id;
      var item = _state__WEBPACK_IMPORTED_MODULE_1__.state.cart.find(function (item) {
        return item.id === itemId;
      });
      item.quantity = item.quantity - 1;
      if (!item.quantity) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.deleteItemFromCart)(item, _state__WEBPACK_IMPORTED_MODULE_1__.state.cart);
      }
      render();
      return;
    }
    if (e.target.classList.contains("increment-btn")) {
      var _itemId = e.target.dataset.id;
      var _item = _state__WEBPACK_IMPORTED_MODULE_1__.state.cart.find(function (item) {
        return item.id === _itemId;
      });
      _item.quantity = _item.quantity + 1;
      render();
      return;
    }
  });
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.classList.contains("checkout")) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.goToCheckout)(_state__WEBPACK_IMPORTED_MODULE_1__.state.cart);
      render();
      return;
    }
  });
  render();
  function render() {
    if (_state__WEBPACK_IMPORTED_MODULE_1__.state.cartShown) {
      renderProductsWithCart(_products__WEBPACK_IMPORTED_MODULE_0__["default"], _state__WEBPACK_IMPORTED_MODULE_1__.state);
      return;
    }
    renderProducts(_products__WEBPACK_IMPORTED_MODULE_0__["default"], _state__WEBPACK_IMPORTED_MODULE_1__.state);
  }
  function renderProducts(products, state) {
    var productsEl = getProductsEl(products);
    var cartBtnEl = getCartBtnEl(state);
    appEl.innerHTML = "\n            <header>\n                <h1>Cat Shop</h1>\n                ".concat(cartBtnEl, "\n            </header>\n            ").concat(productsEl, "\n        ");
  }
  function renderProductsWithCart(products, state) {
    var productsEl = getProductsEl(products);
    var cartEl = getCartEl(products, state.cart);
    var cartBtnEl = getCartBtnEl(state);
    appEl.innerHTML = "\n            <header>\n                <h1>Cat Shop</h1>\n                ".concat(cartBtnEl, "\n            </header>\n            ").concat(cartEl, "\n            ").concat(productsEl, "\n    ");
  }

  // We assume that "n" in "View Cart(n)" equals to the number of items, not the sum of all items' quantities
  function getCartBtnEl(state) {
    var itemCount = state.cart.length;
    return !state.cartShown ? "<button class=\"cart-btn\" type=\"button\">View Cart (".concat(itemCount, ")</button>") : "<button class=\"cart-btn\" type=\"button\">Hide Cart</button>";
  }
  function getProductsEl(products) {
    var productListEl = products.map(function (product) {
      return "\n                <li class=\"product\">\n                    <img class=\"product-img\" src=\"".concat(product.img, ".jpg\" alt=\"img-for-").concat(product.name, "\"/>\n                    <p class=\"product-name\">").concat(product.name, "</p>\n                    <p><span>$</span><span class=\"product-price\">").concat(product.price, "</span><span>/each</span></p>\n                    <button class=\"add-btn\" type=\"button\" data-id=\"").concat(product.id, "\">Add to cart</button>\n                </li>\n            ");
    }).join("");
    return "\n            <div class=\"products\"> \n                <h2>Our Products</h2>\n                <ul class=\"product-list\">\n                    ".concat(productListEl, "\n                </ul>\n            </div>\n        ");
  }
  function getCartEl(products, cart) {
    var itemListEl = cart.map(function (item) {
      var product = products.find(function (product) {
        return product.id === item.productId;
      });
      return "\n                <li class=\"item\">\n                    <img class=\"item-img\" src=\"".concat(product.img, ".jpg\" alt=\"img-for-").concat(product.name, "\"/>\n                    <p class=\"item-name\">").concat(product.name, "</p>\n                    <div>\n                        <p>Each</p>\n                        <p>$").concat(product.price, "</p>\n                    </div>\n                    <div>\n                        <p>Quantity</p>\n                        <div class=\"quantity-counter\">\n                            <button type=\"button\" class=\"decrement-btn\" data-id=\"").concat(item.id, "\">-</button>\n                            <p class=\"quantity\">").concat(item.quantity, "</p>\n                            <button type=\"button\" class=\"increment-btn\" data-id=\"").concat(item.id, "\">+</button>\n                        </div>\n                    </div>\n                    <div>\n                        <p>Subtotal</p>\n                        <p>$").concat((0,_state__WEBPACK_IMPORTED_MODULE_1__.getSubtotalPrice)(item), "</p>\n                    </div>\n                </li>\n            ");
    }).join("");
    return !cart.length ? "<div class=\"cart\"><p>Nothing in the cart</p></div>" : "\n            <div class=\"cart\">\n                <h2>My cart</h2>\n                <ul class=\"item-list\">\n                    ".concat(itemListEl, "\n                </ul>\n                <div class=\"checkout-content\">\n                    <p><span>Total: $</span><span class=\"total-price\">").concat((0,_state__WEBPACK_IMPORTED_MODULE_1__.getTotalPrice)(cart), "</span></p>\n                    <form action=\"\" class=\"checkout\">\n                        <input type=\"hidden\" value=\"").concat((0,_state__WEBPACK_IMPORTED_MODULE_1__.getTotalPrice)(cart), "\" />  \n                        <button type=\"submit\" class=\"checkout-btn\">Checkout</button>\n                    </form>\n                </div>\n            </div>\n        ");
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=site.js.map