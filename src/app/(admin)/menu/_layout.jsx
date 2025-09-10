import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
          <Link href='/(admin)/menu/create' asChild>
            <Pressable>
              <Ionicons name="add-circle-outline" size={24} color={'#007aff'} />
            </Pressable>
          </Link>
        )
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
           headerRight: () => (
          <Link href='/(admin)/menu/create' asChild>
            <Pressable>
              <Ionicons name="create" size={24} color={'#007aff'} />
            </Pressable>
          </Link>
        )
        }}
      />

    </Stack>
  );
}
