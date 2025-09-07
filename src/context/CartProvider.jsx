import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { randomUUID } from 'expo-crypto'
const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addItem = (product, size) => {
        let isPresent = cartItems.find(p => p.id === product.id)

        if (isPresent && isPresent.size === size) {
            updateQuantity(isPresent.id, 1)
            return;
        }

        let newItem = {
            name: product.name,
            id: randomUUID(),
            size,
            price: product.price,
            image: product.image,
            quantity: 1
        }

        setCartItems([...cartItems, newItem])
        Alert.alert('item added to cart ')
    }

    const updateQuantity = (id, amount) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
    }
    const total = cartItems.reduce((sum, item) => sum += item.price * item.quantity, 0)
    return (
        <CartContext.Provider value={{ cartItems, addItem, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider

export const useCart = () => useContext(CartContext)
