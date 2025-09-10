import { FlatList } from 'react-native'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'

const Orders = () => {
  return (
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
  )
}

export default Orders