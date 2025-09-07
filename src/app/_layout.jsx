// app/_layout.js
import { Stack } from "expo-router";
import CartProvider from "@/context/CartProvider";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerTitleAlign: 'center' }} />

      </Stack>
    </CartProvider>
  );
}
