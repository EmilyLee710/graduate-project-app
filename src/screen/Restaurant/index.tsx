import * as React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';

import RestaurantList from './RestaurantList'
import RestaurantDetail from './RestaurantDetail'
import FoodDetail from '../Food/FoodDetail'

const MyStack = createStackNavigator(
  {
    RestaurantList: {
      screen: RestaurantList,
      navigationOptions: {
        title: '今天去哪吃',
        headerLeft:
          (
            <Image style={{ width: 30, height: 30 }} source={require('../../../assets/cat.png')} />
          ),
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          marginLeft:-30
        },
      }
    },
    RestaurantDetail: {
      screen: RestaurantDetail,
      navigationOptions: {
        title: '餐厅详情',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          marginLeft: -30
        },
      }
    }, FoodDetail: {
      screen: FoodDetail,
      navigationOptions: {
        title: '菜品详情',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          marginLeft: -30
        },
      }
    }
  }, {
    initialRouteName: 'RestaurantList'
  }
)

export default MyStack