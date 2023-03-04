import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import React,{useEffect, useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import SearchStyle from './SearchStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';



const data = [
    { label: 'Happy', value: 'happy' },
    { label: 'Sad', value: 'sad' },
    { label: 'Angry', value: 'angry' },
    { label: 'Surprise', value: 'surprise' },
    { label: 'Neutral', value: 'neutral' },
   
  ];



const SearchScreen = ({route,navigation}) => {

    console.log(route)
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [ExpressionMode,setExpressionMode] = useState(false)
    const [accesstoken,setAccesstoken] = useState('')



    

  


  return (
  <>

    <View style={SearchStyle.outer}>
     
        <View style={SearchStyle.container}>
        
       
        <Dropdown
          style={[SearchStyle.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={SearchStyle.placeholderStyle}
          selectedTextStyle={SearchStyle.selectedTextStyle}
          inputSearchStyle={SearchStyle.inputSearchStyle}
          iconStyle={SearchStyle.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            navigation.navigate('ResultScreen',{data:route.params,Expressionvalue:item.value})
          }}
          //"Safety"
          renderLeftIcon={() => (
            <FontAwesome5
              style={SearchStyle.icon}
              color={isFocus ? '#CCCCCC' : 'white'}
              name={value == 'happy'? 'smile':null || value == 'sad'? 'frown':null|| value == 'angry'?'angry':null|| value == 'surprise'?'surprise':null|| value == 'enutral'?'meh':null}
              size={20}
            />
          )}
        />
      </View>
      <View style={{height:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%',height:'50%',backgroundColor:'#E6E6E630',borderRadius:100}} onPress={()=>{navigation.navigate('DetectScreen',{data:route.params})}}>
            <Text style={{fontSize:16,color:'white'}} >Face Detect</Text>
            <MaterialCommunityIcons name='face-recognition'color='#E6E6E680' size={100}/>
      </TouchableOpacity>

      </View>
      

      
    </View>
    
 
    </>
  )
}

export default SearchScreen