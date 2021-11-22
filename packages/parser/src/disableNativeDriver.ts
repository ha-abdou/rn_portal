import { Animated } from 'react-native'

const disableNativeDriver = () => {
  const timing = Animated.timing
  // @ts-ignore timingis not frozen. required to disable native drive
  Animated.timing = (value, config) => {
    return timing(value, { ...config, useNativeDriver: false })
  }

  const spring = Animated.spring
  Animated.spring = (value, config) => {
    return spring(value, { ...config, useNativeDriver: false })
  }

  const decay = Animated.decay
  Animated.decay = (value, config) => {
    return decay(value, { ...config, useNativeDriver: false })
  }
}

export default disableNativeDriver
