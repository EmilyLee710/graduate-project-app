import * as React from 'react'
import { View, Text,FlatList, ListRenderItem, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default class Order extends React.Component<NavigationScreenProps>{
   render(){
       return (
           <View style={{backgroundColor:'white',height:700}}>
               {/* <Text>OrderSuccess</Text> */}
               <View style={{marginTop:20,flexDirection:'row',justifyContent:'center'}}>
                  <EvilIcons name='check' color='#d81e06' size={100}/>
               </View>
               <Text style={{fontSize:16,color:'black',textAlign:'center',marginTop:20}}>下单成功，餐厅马上为您准备</Text>
           </View>
       )
   }
}