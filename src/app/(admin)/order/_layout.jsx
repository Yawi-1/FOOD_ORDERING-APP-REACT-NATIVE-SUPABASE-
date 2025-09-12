import { Stack } from "expo-router";

export default function OrderStack() {
    return (
        <Stack screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="list" options={{ headerShown:false }} />
            <Stack.Screen name='[id]' options={{ title: 'Order Detail' }} />
        </Stack>
    )
}