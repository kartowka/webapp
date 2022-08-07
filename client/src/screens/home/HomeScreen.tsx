import { FC } from 'react'
import { View, FlatList, Text } from 'react-native'
import { HomeScreenWrapper } from '@assets/styles'
import StudentDetails from '@screens/student/StudentDetails'
import { getStudents } from '@model/student'

const HomeScreen: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const onItemClick = (itemID: string) => {
    navigation.navigate('Details', { studentID: itemID })
  }
  const studentsDetails = getStudents()
  return (
    <View style={HomeScreenWrapper.background}>
      <FlatList
        data={studentsDetails}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StudentDetails id={item.id} name={item.name} onItemSelect={onItemClick}></StudentDetails>
        )}
      ></FlatList>
    </View>
  )
}

export default HomeScreen
