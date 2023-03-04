import { StyleSheet } from "react-native";

const SearchStyle = StyleSheet.create({
   outer:{
      height:'100%',
      backgroundColor:'#333333'
      
     
   },
    container: {
        backgroundColor: '#333333',
        height:'98%',
       marginTop:'20%'
      },
      dropdown: {
        height: 50,
        backgroundColor:'#333333',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop:'20%'
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color:'#F2F2F2'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#F2F2F2'

      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      camera: {
        flex: 1,
      },
      facesContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      face: {
        borderWidth: 2,
        borderRadius: 1,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
      },
      expressionText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
 
})

export default SearchStyle