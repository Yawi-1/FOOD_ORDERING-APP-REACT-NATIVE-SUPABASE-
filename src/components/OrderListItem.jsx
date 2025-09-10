import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'

const OrderListItem = ({ order }) => {
  const segments = useSegments()
  return (
    <Link href={`/${segments[0]}/order/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.date}>
            {new Date(order.created_at).toUTCString()}
          </Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

export default OrderListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
})
