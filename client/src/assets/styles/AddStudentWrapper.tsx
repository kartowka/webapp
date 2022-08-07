import { StyleSheet } from 'react-native'
import { riotColors } from '@constants/colors'
const AddStudentWrapper = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    padding: 10,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: riotColors.grey,
  },
  buttonContainer: {
    margin: 12,
    backgroundColor: riotColors.grey,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: riotColors.white,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
})

export default AddStudentWrapper
