import products from "./products";

export const state = {
    cart: [],          // cart = [item1, item2, ...], item data schema: item = {id, productId, quantity}
    cartShown: false,
};

export function addItemToCart(productId, cart) {
    const item = cart.find(item => item.productId === productId);
    if (item === undefined) { 
        const id = 1000 + productId;
        cart.push( {id, productId, quantity: 1} );
    } else {
        item.quantity = item.quantity + 1;
    }
}

export function deleteItemFromCart(item, cart) {
    cart.splice(cart.indexOf(item), 1);
}

export function getSubtotalPrice(item) {
    const eachPrice = products.find(product => product.id === item.productId).price;
    return parseFloat((eachPrice * item.quantity).toFixed(2));
}

export function getTotalPrice(cart) {
    let total = 0;
    for (let item of cart) {
        total += getSubtotalPrice(item);
    }
    return parseFloat(total.toFixed(2));
}

export function goToCheckout(cart) {
    cart.length = 0;
}