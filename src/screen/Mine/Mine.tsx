import * as React from 'react'
import { View, Text, FlatList, ListRenderItem, ToastAndroid, Image, TouchableHighlight } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import State from '../../services/State'

import Toast from 'react-native-simple-toast'

interface Params {
   id: string
}

interface State {
   userId: string
}

export default class Mine extends React.Component<NavigationScreenProps<Params>, State>{

   state: State = {
      userId: null
   }

   render() {
      return (
         //  <View>
         //      <Text>Order</Text>
         //  </View>
         <View style={{ backgroundColor: 'white', height: 700 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 368, height: 140 }}>
               <Image source={require('../../../assets/user_avatar.jpg')}
                  style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20, marginLeft: 20 }} />
               <View style={{ marginTop: 20, marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>阿滢{this.state.userId}</Text>
                  <TouchableHighlight activeOpacity={0.5} onPress={() => this.props.navigation.push('Login', {

                  })}>
                     <Text style={{ marginTop: 20 }}>点击此处登录</Text>
                  </TouchableHighlight>
                  <TouchableHighlight activeOpacity={0.5} onPress={() => this.props.navigation.push('Userinfo', {

                  })}>
                     <Text style={{ marginTop: 20 }}>编辑个人信息</Text>
                  </TouchableHighlight>
               </View>
            </View>
            <TouchableHighlight activeOpacity={0.5} onPress={() => this.props.navigation.push('Userorder', {

            })}>
               <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Image source={require('../../../assets/user_order.png')}
                     style={{ width: 30, height: 30, marginLeft: 20 }} />
                  <Text style={{ marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 }}>我的订单</Text>
               </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.5} onPress={() => this.props.navigation.push('Usercollect', {

            })}>
               <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Image source={require('../../../assets/collect.png')}
                     style={{ width: 30, height: 30, marginLeft: 20 }} />
                  <Text style={{ marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 }}>我的收藏</Text>
               </View>
            </TouchableHighlight>
         </View>
      )
   }

   componentWillReceiveProps(nextProps) {
      // Toast.show(nextProps.id)
      // this.setState({
      //    userId: nextProps.id
      // });
      if (JSON.stringify(State.getItem('userId')) !== null) {
         // Toast.show(JSON.stringify(State.getItem('userId')))
         let array = JSON.stringify(State.getItem('userId')).split('')
         // Toast.show(array[1])
         this.setState({
            userId: array[1]
         })
      }
   }

   componentWillMount() {
      // let id = State.getItem('userId');
      // Toast.show(typeof(id))


      // Toast.show(this.props.navigation.state.params.id)
      // if(this.props.navigation.state.params !== null){
      // let userId = this.props.navigation.state.params.id
      // this.setState({
      //    userId:userId
      // })
      // }
   }
}