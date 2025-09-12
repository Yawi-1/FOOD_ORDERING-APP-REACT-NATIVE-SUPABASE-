import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function ListLayout() {
    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
            <TopTabs
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
                    tabBarIndicatorStyle: { backgroundColor: "blue" },
                    tabBarStyle: { backgroundColor: "white" },
                    tabBarShowIcon: true,
                }}
            >
                <TopTabs.Screen
                    name="index"
                    options={{
                        title: "Active",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="bonfire" size={20} color={color} />
                        ),
                        tabBarActiveTintColor: '#007aff',
                        tabBarInactiveTintColor: "gray"
                    }}
                />
                <TopTabs.Screen
                    name="archive"
                    options={{
                        title: "Archive",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="checkmark-circle-outline" size={20} color={color} />
                        ),
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: "gray"
                    }}
                />
            </TopTabs>
        </SafeAreaView>
    );
}
