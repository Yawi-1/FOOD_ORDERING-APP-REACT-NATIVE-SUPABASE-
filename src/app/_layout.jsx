// app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This will render the (tabs) layout */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
