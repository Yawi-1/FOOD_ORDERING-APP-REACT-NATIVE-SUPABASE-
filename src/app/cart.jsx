import { Alert, FlatList, Text, View } from 'react-native';
import React from 'react';
import { useCart } from '@/context/CartProvider';
import CartList from '@/components/CartList';
import Button from '@/components/Button';

const CartScreen = () => {
  const { cartItems, total } = useCart();
  const checkout = ()=> {
    Alert.alert('Check out clicked.')
  }

  if (cartItems.length === 0) return <Text >Empty Cart</Text>
  return (
    <View style={{padding:10, gap:10}}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartList cartItem={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={{margin:10, fontWeight:'600', fontSize:16}}>Total : ₹ {total.toFixed(2)}</Text>
      <Button title='Checkout' onPress={checkout}/>
    </View>

  );
};

export default CartScreen;
