export const updateCart = (state) => {
  //calculate itmes price
  const itemsPrice = state.cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  //shipping price constant
  state.shipping_price = "29";

  //total items price
  state.items_price = Number(itemsPrice).toFixed(2);

  //calculate the total price
  state.totalPrice = (
    Number(state.items_price) + Number(state.shipping_price)
  ).toFixed(2);

  //save the cart to the local storage
  localStorage.setItem("cart", JSON.stringify(state));
};

export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart"));
};
// hello world im here right now what you want from me , just tell me!
