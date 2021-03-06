import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Mine from './Mine';
import Login from '../Login';
import Userinfo from './Userinfo';
import Userorder from './Userorder';
import Resgister from '../Register';
import Usercollect from './UserCollect';
import Userconfirm from './Userconfirm';
import UserEditpwd from './UserEditpwd';
const MyStack = createStackNavigator({
    Mine: {
        screen: Mine,
        navigationOptions: {
            title: '我到底是谁',
            headerLeft: (React.createElement(Image, { style: { width: 30, height: 30 }, source: require('../../../assets/cat.png') })),
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    Userorder: {
        screen: Userorder,
        navigationOptions: {
            title: '我的订单',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    Usercollect: {
        screen: Usercollect,
        navigationOptions: {
            title: '我的收藏',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, Userinfo: {
        screen: Userinfo,
        navigationOptions: {
            title: '个人信息',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: '用户登录',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, Register: {
        screen: Resgister,
        navigationOptions: {
            title: '用户注册',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, Userconfirm: {
        screen: Userconfirm,
        navigationOptions: {
            title: '修改密码',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, UserEditpwd: {
        screen: UserEditpwd,
        navigationOptions: {
            title: '修改密码',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }
}, {
    initialRouteName: 'Mine'
});
export default MyStack;
