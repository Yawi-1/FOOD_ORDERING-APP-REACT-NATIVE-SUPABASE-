import { FlatList, Text, View } from 'react-native';

import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';
import { ActivityIndicator } from 'react-native';

export default function AdminMenu() {
  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={'large'} /></View>
  }
  if (error) {
    <Text> Data can't be fetched.</Text>
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}