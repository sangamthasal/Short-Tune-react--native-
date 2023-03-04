import { View, Text,StyleSheet } from 'react-native'
import { HStack } from 'native-base'
import React from 'react'

const Controller = () => {
  return (
    <View style={styles.controllercontainer}>
        <HStack space='20%'>
          <View style={styles.imagecontainer}>
            <Text>Image</Text>
          </View>
          <View style={styles.controller}>
            <Text>Controller</Text>
            <HStack space={2}>
                <Text>previous</Text>
                <Text>pause</Text>
                <Text>forward</Text>
            </HStack>
          </View>
        
        </HStack>
    </View>
  )
}

export default Controller

const styles= StyleSheet.create({
    controllercontainer:{
        height:'10%',
        backgroundColor:'red'
    },
    imagecontainer:{
        backgroundColor:'yellow',
        width:'18%',
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    controller:{
        justifyContent:'center',
        alignItems:'center'
    }
})