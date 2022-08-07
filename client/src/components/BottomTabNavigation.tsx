import { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import { riotColors } from '@constants/colors'
import { DetailsScreen } from '@screens/index'
import HomeScreenStackNavigator from '@components/HomeScreenStackNavigator'
const Tab = createBottomTabNavigator()
const BottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any
          if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline'
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: riotColors.orange,
        tabBarInactiveTintColor: riotColors.grey,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenStackNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen name="About" component={DetailsScreen}></Tab.Screen>
    </Tab.Navigator>
  )
}
export default BottomTabNavigator
