import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function OrdersStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff6600", 
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "My Orders"
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Order Detail",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons name="chevron-back" size={24} color={tintColor} />
          ),
        }}
      />
    </Stack>
  );
}
