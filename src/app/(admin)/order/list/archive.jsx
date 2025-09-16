import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import OrderListItem from '@/components/OrderListItem'
import { useAdminOrdersList } from '@/api/orders'

const Orders = () => {
  const { data: orders, isLoading, error } = useAdminOrdersList({ archived: true })
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  
    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Orders failed to fetch.</Text>
        </View>
      )
    }
  return (
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
  )
}

export default Orders