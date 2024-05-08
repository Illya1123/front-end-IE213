// import { createContext, useState, useMemo } from 'react';

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     const existingProduct = cart.find((item) => item.id === product.id);
//     if (existingProduct) {
//       existingProduct.quantity += product.quantity;
//     } else {
//       setCart((prevCart) => [...prevCart, product]);
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id!== productId));
//   };

//   const updateCartQuantity = (productId, newQuantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) => {
//         if (item.id === productId) {
//           item.quantity = newQuantity;
//         }
//         return item;
//       })
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const cartTotal = useMemo(() => {
//     return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   }, [cart]);

//   const cartQuantity = useMemo(() => {
//     return cart.reduce((acc, item) => acc + item.quantity, 0);
//   }, [cart]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         clearCart,
//         cartTotal,
//         cartQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export { CartProvider, CartContext };
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };