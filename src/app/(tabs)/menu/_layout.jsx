import { Stack } from "expo-router";
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
        }}
      />
      <Stack.Screen
        name="[id]"
      />
    </Stack>
  );
}
