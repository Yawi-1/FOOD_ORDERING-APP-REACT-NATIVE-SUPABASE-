import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!isAdmin) return <Redirect href="/(user)" />;

  return (
    <Tabs screenOptions={{
      headerShown: false, 
      tabBarStyle: {
        backgroundColor: "blue",
      },
      tabBarActiveTintColor: "white",
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