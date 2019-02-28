import * as React from 'react'
import { View, Text,Image,FlatList, ListRenderItem, ToastAndroid,TouchableHighlight,Button,TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import AntDesign from 'react-native-vector-icons'

interface State{
  numoffood:number
}

export default class Order extends React.Component<NavigationScreenProps,State>{

  state:State={
    numoffood:1
  }
  
   numCutdown(){
     if(this.state.numoffood>1){
       this.setState({
         numoffood:this.state.numoffood-1
       })
     }
   }

   numIncrease(){
    if(this.state.numoffood>1){
      this.setState({
        numoffood:this.state.numoffood+1
      })
    }
  }

   render(){
       return (
           <View style={{backgroundColor:'white'}}>
               {/* <Text>Order</Text> */}
              <View style={{flexDirection:'row',marginTop:20,marginLeft:10}}>
                <Image source={require('../../../assets/foog_recommend.jpg')}
                style={{width:70,height:70}}/>
                <View style={{marginLeft:10}}>
                  <Text style={{fontSize:16,color:'black'}}>麻婆豆腐</Text>
                  <Text style={{color:'black'}}>川胖子</Text>
                  <View style={{flexDirection:'row',width:60,marginTop:20}}>
                     <TouchableOpacity activeOpacity={0.5} onPress={()=>this.numCutdown()}>
                        {/* <View style={{width:30,height:30,borderColor:'#dcdcdc',borderRadius:10}}>
                          <Text>-</Text>
                        </View>  */}
                       <AntDesign name='minuscircleo' color='#d81e06' size={25}/>
                     </TouchableOpacity>
                     <Text>{this.state.numoffood}</Text>
                     <TouchableOpacity activeOpacity={0.5} onPress={()=>this.numIncrease()}>
                      {/* <View style={{width:30,height:30,borderColor:'#dcdcdc',borderRadius:10}}>
                         <Text>-</Text>
                       </View>  */}
                       <AntDesign name='pluscircleo' color='#d81e06' size={25}/>
                     </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Ordersuccess')}>
                      <View style={{width:80,height:46,backgroundColor:'#d81e06'}}>
                        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:14}}>下单成功</Text>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Orderfailed')}>
                      <View style={{width:80,height:46,backgroundColor:'#d81e06'}}>
                        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:14}}>下单失败</Text>
                      </View>
                </TouchableOpacity>
              </View> */}
              
           </View>
       )
   }
}