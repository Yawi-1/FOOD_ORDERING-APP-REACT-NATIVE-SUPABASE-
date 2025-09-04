import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems)
    const addItem = (product, size) => {
        // If product is already in cart then instead of adding it agian increase the quantity
        let isPresent = cartItems.find(p => p.id === product.id)
        let newItem = {
            name: product.name,
            id: product.id,
            size,
            price: product.price,
            image: product.image
        }
        if (isPresent) {
            setCartItems([...cartItems, { ...newItem, quantity: isPresent.quantity + 1 }])
        } else {
            setCartItems([...cartItems, { ...newItem, quantity: 1 }])
        }
    }
    return (
        <CartContext.Provider value={{ cartItems, addItem }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider

export const useCart = () => useContext(CartContext)
