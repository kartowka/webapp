import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { HomeScreen, DetailsScreen } from '@screens/index'
import TopBarNavigation from '@components/TopBarNavigator'
import AddStudent from '@screens/student/AddStudentScreen'

const NativeStack = createNativeStackNavigator()

const HomeScreenStackNavigator: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
	const createStudentButton = () => {
		navigation.navigate('AddStudent')
	}
	return (
		<NativeStack.Navigator>
			<NativeStack.Screen
				name={'Students'}
				component={HomeScreen}
				options={{
					headerRight: () => <TopBarNavigation onClick={() => createStudentButton()}></TopBarNavigation>,
				}}
			/>
			<NativeStack.Screen name={'Details'} component={DetailsScreen} />
			<NativeStack.Screen name={'AddStudent'} component={AddStudent} />
		</NativeStack.Navigator>
	)
}

export default HomeScreenStackNavigator
