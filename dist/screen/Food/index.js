import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FoodList from './FoodList';
import FoodDetail from './FoodDetail';
import Order from '../Order';
import Ordersuccess from '../Order/Ordersuccess';
import Orderfailed from '../Order/Orderfailed';
const MyStack = createStackNavigator({
    FoodList: {
        screen: FoodList,
        navigationOptions: {
            title: '今天吃什么',
            headerLeft: (React.createElement(Image, { style: { width: 30, height: 30 }, source: require('../../../assets/cat.png') })),
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    FoodDetail: {
        screen: FoodDetail,
        navigationOptions: {
            title: '菜品详情',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, Order: {
        screen: Order,
        navigationOptions: {
            title: '订单详情',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    Ordersuccess: {
        screen: Ordersuccess,
        navigationOptions: {
            title: '下单成功',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, Orderfailed: {
        screen: Orderfailed,
        navigationOptions: {
            title: '下单失败',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }
}, {
    initialRouteName: 'FoodList'
});
export default MyStack;
