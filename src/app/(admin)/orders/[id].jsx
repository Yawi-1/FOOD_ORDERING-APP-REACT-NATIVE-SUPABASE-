import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const orders = [
  { id: 1, title: "Order #1", status: "Delivered", details: "2x Pizza, 1x Coke" },
  { id: 2, title: "Order #2", status: "Pending", details: "1x Burger, 1x Fries" },
  { id: 3, title: "Order #3", status: "Cancelled", details: "1x Pasta" },
];

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) return <Text>Order not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{order.title}</Text>
      <Text style={{ fontSize: 16, marginVertical: 8 }}>
        Status: {order.status}
      </Text>
      <Text style={{ fontSize: 16 }}>Items: {order.details}</Text>
    </View>
  );
}
