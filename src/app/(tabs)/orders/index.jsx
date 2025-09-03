import { FlatList, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

const orders = [
  { id: 1, title: "Order #1", status: "Delivered" },
  { id: 2, title: "Order #2", status: "Pending" },
  { id: 3, title: "Order #3", status: "Cancelled" },
];

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <Link href={`/orders/${item.id}`} asChild>
          <Pressable
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: "gray" }}>{item.status}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}
