import { FlatList, Text } from 'react-native';

import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { Link } from 'expo-router';

export default function AdminProducts() {
  return (
   
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      ListHeaderComponent={<Link href={'/create'}>Admin Dashboard</Link>}
    />
  );
}