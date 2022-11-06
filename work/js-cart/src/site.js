"use strict";

import products from "./products";
import { state, addItemToCart, deleteItemFromCart, getSubtotalPrice, getTotalPrice, goToCheckout } from "./state";

(function () {
    const appEl = document.querySelector('#shop-app');

    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains("add-btn")) {
            const productId = e.target.dataset.id;
            addItemToCart(productId, state.cart);
            render();
            return;
        }

        if (e.target.classList.contains('cart-btn')) {
            state.cartShown = !state.cartShown;
            render();
            return;
        }

        if (e.target.classList.contains("decrement-btn")) {
            const itemId = e.target.dataset.id;
            const item = state.cart.find(item => item.id === itemId);
            item.quantity = item.quantity - 1;
            if (!item.quantity) {
                deleteItemFromCart(item, state.cart);
            }
            render();
            return;
        }

        if (e.target.classList.contains("increment-btn")) {
            const itemId = e.target.dataset.id;
            const item = state.cart.find(item => item.id === itemId);
            item.quantity = item.quantity + 1;
            render();
            return;
        }  
    });

    appEl.addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.target.classList.contains("checkout")) {
            goToCheckout(state.cart); 
            render();
            return;
        }
    });


    render();

    function render() {
        if (state.cartShown) {
            renderProductsWithCart(products, state);
            return;
        }
        renderProducts(products, state);
    }

    function renderProducts(products, state) {
        const productsEl = getProductsEl(products);
        const cartBtnEl = getCartBtnEl(state);
        appEl.innerHTML = `
            <header>
                <h1>Cat Shop</h1>
                ${cartBtnEl}
            </header>
            ${productsEl}
        `;
    }

    function renderProductsWithCart(products, state) {
        const productsEl = getProductsEl(products);
        const cartEl = getCartEl(products, state.cart);
        const cartBtnEl = getCartBtnEl(state);
        appEl.innerHTML = `
            <header>
                <h1>Cat Shop</h1>
                ${cartBtnEl}
            </header>
            ${cartEl}
            ${productsEl}
    ` ;
    }

    // We assume that "n" in "View Cart(n)" equals to the number of items, not the sum of all items' quantities
    function getCartBtnEl(state) {
        const itemCount = state.cart.length;
        return !state.cartShown
        ? `<button class="cart-btn" type="button">View Cart (${itemCount})</button>`
        : `<button class="cart-btn" type="button">Hide Cart</button>`
    }

    function getProductsEl(products) {
        const productListEl = products.map(product => {
            return `
                <li class="product">
                    <img class="product-img" src="${product.img}.jpg" alt="img-for-${product.name}"/>
                    <p class="product-name">${product.name}</p>
                    <p><span>$</span><span class="product-price">${product.price}</span><span>/each</span></p>
                    <button class="add-btn" type="button" data-id="${product.id}">Add to cart</button>
                </li>
            `;
        }).join("");
        return `
            <div class="products"> 
                <h2>Our Products</h2>
                <ul class="product-list">
                    ${productListEl}
                </ul>
            </div>
        `;
    }

    function getCartEl(products, cart) {
        const itemListEl = cart.map(item => {
            const product = products.find(product => product.id === item.productId);     
            return `
                <li class="item">
                    <img class="item-img" src="${product.img}.jpg" alt="img-for-${product.name}"/>
                    <p class="item-name">${product.name}</p>
                    <div>
                        <p>Each</p>
                        <p>$${product.price}</p>
                    </div>
                    <div>
                        <p>Quantity</p>
                        <div class="quantity-counter">
                            <button type="button" class="decrement-btn" data-id="${item.id}">-</button>
                            <p class="quantity">${item.quantity}</p>
                            <button type="button" class="increment-btn" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div>
                        <p>Subtotal</p>
                        <p>$${getSubtotalPrice(item)}</p>
                    </div>
                </li>
            `;
        }).join(""); 
        return !cart.length
            ? `<div class="cart"><p>Nothing in the cart</p></div>`
            : `
            <div class="cart">
                <h2>My cart</h2>
                <ul class="item-list">
                    ${itemListEl}
                </ul>
                <div class="checkout-content">
                    <p><span>Total: $</span><span class="total-price">${getTotalPrice(cart)}</span></p>
                    <form action="" class="checkout">
                        <input type="hidden" value="${getTotalPrice(cart)}" />  
                        <button type="submit" class="checkout-btn">Checkout</button>
                    </form>
                </div>
            </div>
        `;
    }
})();