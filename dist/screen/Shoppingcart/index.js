import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import OrderSuccess from '../Order/Ordersuccess';
import OrderFailed from '../Order/Orderfailed';
import Cart from './CartHome';
const MyStack = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: {
            title: '我要买什么',
            headerLeft: (React.createElement(Image, { style: { width: 30, height: 30 }, source: require('../../../assets/cat.png') })),
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    OrderSuccess: {
        screen: OrderSuccess,
        navigationOptions: {
            title: '下单成功',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, OrderFailed: {
        screen: OrderFailed,
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
    initialRouteName: 'Cart'
});
export default MyStack;
