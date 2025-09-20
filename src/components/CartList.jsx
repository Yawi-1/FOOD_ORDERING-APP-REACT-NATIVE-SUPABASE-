import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCart } from '@/context/CartProvider';

const CartList = ({ cartItem }) => {
    const { updateQuantity } = useCart();
    if (!cartItem) return null;
    return (
        <View style={styles.container}>
            <Image source={{ uri: cartItem.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{cartItem.name}</Text>
                <View style={styles.meta}>
                    <Text style={styles.price}>₹{cartItem.price ?? '—'}</Text>
                    <Text style={styles.size}>Size: {cartItem.size}</Text>
                </View>
            </View>
            {/* Update Button */}
            <View style={styles.updateBtnContainer}>
                <TouchableOpacity onPress={() => updateQuantity(cartItem.product_id, cartItem.size, -1)}>
                    <Text style={styles.updateBtn}>–</Text>
                </TouchableOpacity>
                <Text>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(cartItem.product_id, cartItem.size, 1)}>
                    <Text style={styles.updateBtn}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartList;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', margin: 6, borderBottomStartRadius: 30, borderTopEndRadius: 30, },
    image: { width: 80, height: 80, borderRadius: 10 },
    details: { marginLeft: 20, flex: 1 },
    name: { fontSize: 16, fontWeight: '600' },
    meta: { flexDirection: 'row', gap: 20, marginTop: 5, alignItems: 'center' },
    price: { fontSize: 14, fontWeight: 'bold' },
    size: { fontSize: 12, color: '#666' },
    updateBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 10
    },
    updateBtn: {
        fontSize: 20
    }
});
