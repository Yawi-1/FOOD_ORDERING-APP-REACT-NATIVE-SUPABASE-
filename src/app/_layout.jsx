import { Stack } from "expo-router";
import CartProvider from "@/context/CartProvider";
import AuthProvider from "@/context/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ headerTitleAlign: 'center' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
