import { TouchableHighlight } from 'react-native'
import { FC } from 'react'
import { riotColors } from '@constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const TopBarNavigation: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TouchableHighlight
      onPress={() => {
        onClick()
      }}
      underlayColor={riotColors.white}
    >
      <Ionicons name={'add-outline'} size={40} color={riotColors.orange} />
    </TouchableHighlight>
  )
}

export default TopBarNavigation
