import * as React from 'react'
import { View, Text,FlatList, ListRenderItem, ToastAndroid } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';
import Mine from './Mine'
import Login from '../Login'
import Userinfo from './Userinfo'
import Userorder from './Userorder'
import Resgister from '../Register'

// export default class Mine extends React.Component<NavigationScreenProps>{
//    render(){
//        return (
//            <View>
//                <Text>Mine</Text>
//            </View>

//        )
//    }
// }

const MyStack = createStackNavigator(
    {
        Mine:{
        screen:Mine,
        navigationOptions:{
          title:'个人中心',
          headerTitleStyle:{
            flex:1,
            textAlign:'center'
          },
        }
      },
      Userorder:{
        screen:Userorder,
        navigationOptions:{
          title:'我的订单',
          headerTitleStyle:{
            flex:1,
            textAlign:'center',
            marginLeft:-30
          },
        }
      },Userinfo:{
        screen:Userinfo,
        navigationOptions:{
          title:'个人信息',
          headerTitleStyle:{
            flex:1,
            textAlign:'center',
            marginLeft:-30
          },
        }
      },
      Login:{
        screen:Login,
        navigationOptions:{
          title:'用户登录',
          headerTitleStyle:{
            flex:1,
            textAlign:'center',
            marginLeft:-30
          },
        }
      },Register:{
        screen:Resgister,
        navigationOptions:{
          title:'用户注册',
          headerTitleStyle:{
            flex:1,
            textAlign:'center',
            marginLeft:-30
          },
        }
      }},{
      initialRouteName:'Mine'
    }
  )

  export default MyStack