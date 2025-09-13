import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Pressable } from 'react-native';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useProduct } from '@/api/products';
import { ActivityIndicator } from 'react-native';
const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(idString)
  const { data: product, error, isLoading } = useProduct(typeof idString === 'string' ? id : id[0])
  if (isLoading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={'large'} color={'red'} /></View>
  }
  if (error) {
    <Text> Data can't be fetched.</Text>
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{
        title: product.name, headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              <Ionicons name="create" size={24} color={'#007aff'} />
            </Pressable>
          </Link>
        )
      }} />

      {/* Responsive image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={[styles.label, { fontSize: 18 }]}>
        Price: ₹{product.price}
      </Text>
      <Button title='Add to cart' />

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
