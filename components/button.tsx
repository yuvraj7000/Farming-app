import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const Button = ({handleDone,buttonName}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleDone} style={{
                          backgroundColor: '#007BFF',
                          padding: 10,
                          borderRadius: 10,
                          alignItems: 'center',
                          marginHorizontal: 20,
                          marginVertical: 10,
                      }}>
                          <Text style={{ color: 'white', fontSize: 16 }}>{buttonName}</Text>
                      </TouchableOpacity>
    </View>
  )
}

export default Button;