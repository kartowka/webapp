import { StyleSheet, StatusBar } from 'react-native'
import { riotColors } from 'constants/colors'

const StudentDetailsWrapper = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    height: 150,
    width: '98%',
    borderColor: riotColors.black,
    backgroundColor: riotColors.grey,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 2,
    marginLeft: 3,
  },
  avatar: {
    marginTop: 10,
    height: 120,
    width: 120,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 25,
    marginBottom: 20,
  },
  studentID: {
    fontSize: 25,
  },
})

export default StudentDetailsWrapper
