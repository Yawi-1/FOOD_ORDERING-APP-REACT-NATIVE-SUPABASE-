import products from '@assets/data/products';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Pressable } from 'react-native';
import { useCart } from '@/context/CartProvider';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>GO BACK</Text>;
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name,  headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              <Ionicons name="create" size={24} color={'#007aff'} />
            </Pressable>
          </Link>
        )}} />

      {/* Responsive image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={[styles.label, { fontSize: 18 }]}>
        Price: ₹{product.price}
      </Text>
     <Button title='Add to cart'/>
      
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // ✅ better spacing
    backgroundColor: '#fff',
  },
  image: {
    width: width - 32, // ✅ full width minus padding
    height: width - 32, // ✅ keep square ratio
    borderRadius: 12,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600', // ✅ must be string
    marginVertical: 8,
  },
});
