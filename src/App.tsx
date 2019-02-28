import * as React from 'react'
import { AppRegistry,YellowBox,StyleSheet,Image,View} from 'react-native';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation'

import Food from './screen/Food'
import Mine from './screen/Mine'
import Restaurant from './screen/Restaurant'

import State from './services/State'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
State.setItem('host','http://47.106.186.164:8080/zhaoying')
// State.setItem('host','http://127.0.0.1:3000')

const MyTab = createBottomTabNavigator(
      {
        Food: {
          screen:Food,
          navigationOptions:{
            tabBarLabel: '推荐',
          }
        },
        Restaurant: {
          screen:Restaurant,
          navigationOptions:{
            tabBarLabel: '餐厅',
          }
        },
        Mine: {
          screen:Mine,
          navigationOptions:{
            tabBarLabel: '我的',
          }
        },        
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Food') {
              if(focused){
                return <Image style={style.footImage} source={require('../assets/focused_rec_red.png')}/>;
              } else{
                return <Image style={style.footImage} source={require('../assets/rec_black.png')}/>;
              }               
            } else if (routeName === 'Restaurant') {
              if(focused){
                return <Image style={style.footImage} source={require('../assets/focused_restau_red.png')}/>;
              } else{
                return <Image style={style.footImage} source={require('../assets/restau_black.png')}/>;
              }
            } else if (routeName === 'Mine') {
              if(focused){
                return <Image style={style.footImage} source={require('../assets/focused_mine_red.png')}/>;
              } else{
                return <Image style={style.footImage} source={require('../assets/mine_black.png')}/>;
              }
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
          //   return <Feather
          //   name={iconName}
          //   size={26}
          //   style={{ color: tintColor }}
          // />  
          },
        }),
        tabBarOptions: {
          activeTintColor: '#d81e06',
          inactiveTintColor: '#2c2c2c',
          labelStyle:{
            fontSize:16
          },
          style: {
            height:53,
            backgroundColor: 'white',
          }
        },
      }
);

// const MyStack = createStackNavigator(
//   {
//     Main:{
//       screen:MyTab,
//       navigationOptions:{
//         header:null
//       }
//     },
//     BidList:{
//       screen:BidList,
//       navigationOptions:{
//         title:'拍卖专场',
//         headerTitleStyle:{
//           flex:1,
//           textAlign:'center'
//         },
//       }
//     },
//     BidDetail:{
//       screen:BidDetail,
//       navigationOptions:{
//         title:'超级大拍',
//         headerTitleStyle:{
//           flex:1,
//           textAlign:'center'
//         },
//       }
//     },
//   },{
//     initialRouteName:'Main'
//   }
// )

export  default class extends React.Component{
  render(){
    return <MyTab/>
  }

  // componentWillMount(){
  //   State.setItem('showTab',false)
  // }
}


let style = StyleSheet.create({
	footImage: {
		width: 18,
		height: 18
	},
})