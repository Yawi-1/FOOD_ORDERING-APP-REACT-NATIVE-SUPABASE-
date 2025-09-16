import { FlatList } from 'react-native'
import OrderListItem from '@/components/OrderListItem'
import { useMyOrderList } from '@/api/orders'
import { useAuth } from '@/context/AuthContext'

const Orders = () => {
  const { session } = useAuth()
  const { id } = session.user
  const { data: myOrders } = useMyOrderList(id)

  return (
    <FlatList
      data={myOrders}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  )
}

export default Orders