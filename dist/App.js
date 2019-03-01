import * as React from 'react';
import { YellowBox, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Food from './screen/Food';
import Mine from './screen/Mine';
import Restaurant from './screen/Restaurant';
import State from './services/State';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
State.setItem('host', 'http://47.106.186.164:8080/zhaoying');
const MyTab = createBottomTabNavigator({
    Food: {
        screen: Food,
        navigationOptions: {
            tabBarLabel: '佳肴',
        }
    },
    Restaurant: {
        screen: Restaurant,
        navigationOptions: {
            tabBarLabel: '餐厅',
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
        }
    },
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Food') {
                if (focused) {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/focused_rec_red.png') });
                }
                else {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/rec_black.png') });
                }
            }
            else if (routeName === 'Restaurant') {
                if (focused) {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/focused_restau_red.png') });
                }
                else {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/restau_black.png') });
                }
            }
            else if (routeName === 'Mine') {
                if (focused) {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/focused_mine_red.png') });
                }
                else {
                    return React.createElement(Image, { style: style.footImage, source: require('../assets/mine_black.png') });
                }
            }
        },
    }),
    tabBarOptions: {
        activeTintColor: '#d81e06',
        inactiveTintColor: '#2c2c2c',
        labelStyle: {
            fontSize: 16
        },
        style: {
            height: 53,
            backgroundColor: 'white',
        }
    },
});
export default class extends React.Component {
    render() {
        return React.createElement(MyTab, null);
    }
}
let style = StyleSheet.create({
    footImage: {
        width: 18,
        height: 18
    },
});
