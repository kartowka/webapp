import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from '@components/BottomTabNavigation'

const App: React.FC = () => {
	return (
		<NavigationContainer>
			<BottomTabNavigator />
		</NavigationContainer>
	)
}

export default App
