import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useReadOrderById } from '@/api/orders'
import OrderListItem from '@/components/OrderListItem'

const OrderDetail = () => {
  const { id: orderId } = useLocalSearchParams()
  const id = Number(orderId)

  const { data: order, isLoading, error } = useReadOrderById(id)
 

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load order.</Text>
  }

  if (!order) {
    return <Text>No order found.</Text>
  }

  return (
    <View style={styles.container}>
      {/* Scrollable list of items */}
      <OrderListItem order={order}/>
       <ScrollView contentContainerStyle={styles.scrollContent}>
        {order.order_items?.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image
              source={{ uri: item?.products?.image }}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.products?.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹.{item.products?.price}</Text>
                <Text style={styles.size}>Size: {item.size}</Text>
              </View>
            </View>
            <Text style={styles.quantity}>x{item.quantity}</Text>
          </View>
        ))}
      </ScrollView> 
  


    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 10,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  size: {
    fontSize: 13,
    color: 'gray',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginLeft: 10,
  },
})
