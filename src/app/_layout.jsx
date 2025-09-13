import { Stack } from "expo-router";
import CartProvider from "@/context/CartProvider";
import AuthProvider from "@/context/AuthContext";
import QueryProvider from "@/context/QueryProvider";
export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerTitleAlign: 'center' }} />
          </Stack>
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
