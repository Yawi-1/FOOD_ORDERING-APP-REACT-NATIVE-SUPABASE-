import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useProductList } from '@/api/products/index';
export default function UserMenu() {
  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={'large'} /></View>
  }
  if (error) {
    <Text> Data can't be fetched.</Text>
  }

  return (
    <>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        ListHeaderComponent={<Button title={'Logout'} onPress={() => supabase.auth.signOut()} />}
      />
    </>
  );
}