import { FlatList, Text } from 'react-native';
import React from 'react';
import { useCart } from '@/context/CartProvider';
import CartList from '@/components/CartList';

const CartScreen = () => {
  const { cartItems } = useCart();

  if(cartItems.length === 0) return <Text >Empty Cart</Text>
  return (
    <FlatList
      data={cartItems}
      renderItem={({ item }) => <CartList cartItem={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CartScreen;
