import { Stack } from "expo-router";

export default function OrderStack() {
    return (
        <Stack screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="index" options={{ title: 'Orders' }} />
            <Stack.Screen name='[id]' options={{ title: 'Order Detail' }} />
        </Stack>
    )
}