import { Stack } from "expo-router";
import CartProvider from "@/context/CartProvider";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerTitleAlign: 'center' }} />
      </Stack>
    </CartProvider>
  );
}
