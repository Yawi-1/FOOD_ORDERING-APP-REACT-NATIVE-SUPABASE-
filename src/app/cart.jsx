import { Alert, FlatList, Text, View } from 'react-native';
import React from 'react';
import { useCart } from '@/context/CartProvider';
import CartList from '@/components/CartList';
import Button from '@/components/Button';
import { useInsertOrder, useInsertOrderItems } from '@/api/orders';
import { useRouter } from 'expo-router';

const CartScreen = () => {
  const { cartItems, total, setCartItems } = useCart();
  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()
  const router = useRouter()
  const checkout = () => {
    insertOrder({total}, {
      onSuccess: savedOrderItems
    })
  }

  const savedOrderItems = (newOrder) => {
    if (!newOrder) return;
    insertOrderItems({ items: cartItems, order_id: newOrder.id }, {
      onSuccess: () => {
        setCartItems([])
        router.push(`/(user)/order/${newOrder.id}`)
      }
    })
  }

  if (cartItems.length === 0) return <Text >Empty Cart</Text>
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartList cartItem={item} />}
        keyExtractor={(item) => item.product_id.toString()}
      />
      <Text style={{ margin: 10, fontWeight: '600', fontSize: 16 }}>Total : ₹ {total.toFixed(2)}</Text>
      <Button title='Checkout' onPress={checkout} />
    </View>

  );
};

export default CartScreen;
