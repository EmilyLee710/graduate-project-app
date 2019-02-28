import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    //Modal的样式
    modalWrap:{
     flex:1,
     width:'100%',
     backgroundColor:'rgba(0,0,0,0.9)'
   },
   modalStyle: {
     width:260,
     height:280,
     top:'50%',
     marginTop:-140,
     left:'50%',
     marginLeft:-130,
     backgroundColor: 'white', 
   },
   modalClose: {
     justifyContent: 'flex-start',
     alignItems: 'flex-end',
   },
   modalContent: {
     marginTop:20,
     alignItems: 'center', 
   }
 })