import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarStyle: {
        backgroundColor: "blue",
      },
      tabBarActiveTintColor: "white",   // active icon & label color
      tabBarInactiveTintColor: "gray"

    }} >
      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
