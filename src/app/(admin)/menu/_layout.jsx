import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerRight: () => (
          <Link href='/cart' asChild>
            <Pressable>
              <Ionicons name="cart" size={24} color={'#007aff'} />
            </Pressable>
          </Link>
        )
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
      <Stack.Screen
        name="[id]"
      />

    </Stack>
  );
}
