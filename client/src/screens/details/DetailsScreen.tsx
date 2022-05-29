import React, { FC, useState, useEffect } from 'react'
import { View, Text } from 'react-native'

const DetailsScreen: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
	const [studentID, setStudentID] = useState<string>()
	useEffect(() => {
		if (route.params?.studentID) {
			setStudentID(JSON.stringify(route.params.studentID))
		}
	}, [route.params?.studentID])
	return (
		<View>
			<Text>Details for: {studentID}</Text>
		</View>
	)
}

export default DetailsScreen
