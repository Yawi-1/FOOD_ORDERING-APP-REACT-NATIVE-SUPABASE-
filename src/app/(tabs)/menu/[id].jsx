import products from '@assets/data/products';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const sizes = ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState('');
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>GO BACK</Text>;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      {/* Responsive image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.label}>Select size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((item) => {
          const isSelected = selectedSize === item;
          return (
            <TouchableOpacity
              style={[
                styles.sizeButton,
                isSelected && { backgroundColor: 'gray' },
              ]}
              onPress={() => setSelectedSize(item)}
              key={item}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  isSelected && { color: 'white' },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.label, { fontSize: 18 }]}>
        Price: ₹{product.price}
      </Text>

      <TouchableOpacity style={styles.addToCartBtn}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
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
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ✅ responsive wrapping
    gap: 12,
    marginBottom: 20,
  },
  sizeButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  sizeButtonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartBtn: {
    backgroundColor: '#007aff',
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
