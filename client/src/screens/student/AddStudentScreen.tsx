import { FC, useState } from 'react'
import { ScrollView, View, TextInput, TouchableHighlight, Text, Image } from 'react-native'
import { addStudent, student as Student } from '@model/student'
import { riotColors } from '@constants/colors'
import AddStudentWrapper from '@styles/AddStudentWrapper'

const AddStudent: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
	const [id, setId] = useState<string>('')
	const [name, setName] = useState<string>('')

	const onSave = () => {
		const student: Student = {
			id: id,
			name: name,
		}
		addStudent(student)
		navigation.goBack()
	}

	return (
		<ScrollView>
			<View style={AddStudentWrapper.container}>
				<Image source={require('@images/anonymous-icon-2.png')} style={AddStudentWrapper.image}></Image>
				<TextInput style={AddStudentWrapper.textInput} onChangeText={setId} placeholder='ID' keyboardType='default' />
				<TextInput style={AddStudentWrapper.textInput} onChangeText={setName} placeholder='Name' keyboardType='default' />
				<TouchableHighlight style={AddStudentWrapper.buttonContainer} onPress={onSave} underlayColor={riotColors.white}>
					<Text style={AddStudentWrapper.buttonText}>Save</Text>
				</TouchableHighlight>
			</View>
		</ScrollView>
	)
}

export default AddStudent
