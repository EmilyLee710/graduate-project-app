import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    biding:{
        height:20,
        width:50,
        backgroundColor:'#EB6100',
      },
      bidtime:{
        height:20,
        width:318,
        backgroundColor:'#F9F7FA',
        opacity:0.8,
        flexDirection:'row'
      },
      separator_hori:{
        width:'98%',
        height:1,
        marginTop:5,
        // marginLeft:'2%',
        backgroundColor:'#dcdcdc'
     },
     infoimg:{
        width:40,
        height:40,
        marginLeft:5
     },
     focusimg:{
        width:80,
        height:80,
        marginLeft:30,
        marginTop:-45,
        borderWidth:5,
        borderColor:'white'
        // flex:1
     },
     focustext:{
       color:'black',
       fontSize:16,
       marginLeft:5
     },
     modalcontainer:{
      backgroundColor:'rgba(0, 0, 0, 0.5)',
      flex:1,
      paddingTop:330
     },
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