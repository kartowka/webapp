import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { StudentDetailsWrapper } from '@styles/index'

const StudentDetails: React.FC<{
  id: string
  name: string
  onItemSelect: (itemID: string) => void
}> = ({ name, id, onItemSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onItemSelect(id)
      }}
    >
      <View style={StudentDetailsWrapper.container}>
        <Image
          source={require('@images/anonymous-icon-2.png')}
          style={StudentDetailsWrapper.avatar}
        ></Image>
        <View style={StudentDetailsWrapper.textContainer}>
          <Text style={StudentDetailsWrapper.studentName}>{name}</Text>
          <Text style={StudentDetailsWrapper.studentID}>{id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default StudentDetails
