import { StyleSheet } from 'react-native'
import { Unit } from 'utils/ui'

export default StyleSheet.create({
  listHolder: {
    flex: 1
  },
  iconWrapper: {
    width: Unit(240, false),
    height: Unit(150),
    marginTop: Unit(300),
    marginLeft: Unit(255, false),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Unit(128),
    height: Unit(128),
  },
  text: {
    color: '#ffffff90',
    fontSize: Unit(30),
    fontWeight: 'bold',
    textAlign: 'center'
  }
})