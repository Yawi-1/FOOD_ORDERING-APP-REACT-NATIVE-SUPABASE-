import { FlatList } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
export default function UserMenu() {
  return (
    <>
      <Button title={'Logout'} onPress={() => supabase.auth.signOut()} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}