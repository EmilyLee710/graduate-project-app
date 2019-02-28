import * as React from 'react'
import { Text, View,StyleSheet,Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';


import FoodList from './FoodList'
import FoodDetail from './FoodDetail'
import Order from '../Order'
import Ordersuccess from '../Order/Ordersuccess'
import Orderfailed from '../Order/Orderfailed'
// import AuctionDetail from './AuctionDetail'


const MyStack = createStackNavigator(
  {
    FoodList:{
      screen:FoodList,
      navigationOptions:{
        title:'推荐菜品',
        headerTitleStyle:{
          flex:1,
          textAlign:'center'
        },
      }
    },
    FoodDetail:{
      screen:FoodDetail,
      navigationOptions:{
        title:'菜品详情',
        headerTitleStyle:{
          flex:1,
          textAlign:'center',
          marginLeft:-30
        },
      }
    },Order:{
      screen:Order,
      navigationOptions:{
        title:'订单详情',
        headerTitleStyle:{
          flex:1,
          textAlign:'center',
          marginLeft:-30
        },
      }
    },
    Ordersuccess:{
      screen:Ordersuccess,
      navigationOptions:{
        title:'下单成功',
        headerTitleStyle:{
          flex:1,
          textAlign:'center',
          marginLeft:-30
        },
      }
    },Orderfailed:{
      screen:Orderfailed,
      navigationOptions:{
        title:'下单失败',
        headerTitleStyle:{
          flex:1,
          textAlign:'center',
          marginLeft:-30
        },
      }
    }},{
    initialRouteName:'FoodList'
  }
)

export default MyStack