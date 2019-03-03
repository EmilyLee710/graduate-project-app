import * as React from 'react';
import * as model from '../../interface/Model'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Modal, TouchableHighlight, TouchableOpacity, Button, ImageBackground, SectionList } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import RestaurantService from '../../services/Restaurant'
import style from '../../styles/RestaurantDetail'
import State from '../../services/State';


interface Params {
  id: number
}

interface State {
  id: number,
  restaurant: model.RestauInfo,
  cuisineList: model.RestauCuiItem[],
  isLoading: boolean
}

export default class RestaurantDetail extends React.Component<NavigationScreenProps<Params>, State>{
  state: State = {
    id: 0,
    restaurant: {
      id: null,
      restauname: '',
      address: '',
      phone: '',
      cuisinelist: [],
      ctime: 0,
      collect_num: 0,
      description: '',
      license: '',
      cover_url: '',
      sale_info:''
    },
    cuisineList: [],
    isLoading: true
  }

  _foodItem = (info) => {
    let id = info.item.id;
    let name = info.item.c_name;
    let origin_price = info.item.origin_price
    let price = info.item.price;
    let url = info.item.cover_url
    // let id = "1";
    // let name = "hh";
    // // let cover = "info.item.cover";
    // let starting_price = "";
    // // let formatPrice = this.formatPrice(starting_price);
    // let reference_price = info.item.reference_price;
    // let duration_time = info.item.duration_time;
    // let color;
    // let flag;
    // let tag;
    // let status;
    // let formatTime;
    // let exactTime;


    return (
      <TouchableHighlight onPress={() => this.props.navigation.push('FoodDetail', { id: id })}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 150, width: '100%' }}>
          <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')} />
          <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
            <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{name}</Text>
            {/* <Text style={{fontSize:16}}>川胖子</Text> */}
            <Text style={{color:'black',marginTop: 10}}>原价：￥{origin_price}</Text>
            <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 10 }}>现价：￥{price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }


  async getRestauinfo() {
    try {
      const id = this.props.navigation.state.params.id;
      let result = await RestaurantService.GetRestaurantInfo({
        RestaurantId: id,
      })
      if (result.stat === '1') {
        // let cuisineList = result.restaurant.cuisinelist.map((item, index) => {
        //   return item
        // })
        this.setState({
          id: result.restaurant.id,
          restaurant: result.restaurant,
          cuisineList: result.restaurant.cuisinelist
        })
        Toast.show('喵~加载好啦')
      } else {
        throw result.stat
      }

    } catch (error) {
      Toast.show(error)
    }
  }

  componentWillMount() {
    // console.log('______________________________')
    // this.getAuctionMarket();
    // this.getAuctionList('ctime','desc');
    // State.setItem('showTab',false)
    this.getRestauinfo()
  }

  render() {
    return (
      <View>
        {/* <Text>拍品详情</Text> */}
        {/* 会首先传入InitialState*/}
        <ScrollView>
          <View style={{ backgroundColor: 'white' }}>
            <ImageBackground style={style.restaurantimg} source={require('../../../assets/restaurant_cover.jpg')}>
            </ImageBackground>
            <View style={{ width: '88%', marginLeft: '6%', marginTop: 9 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, color: '#d81e06' }}>{this.state.restaurant.restauname}</Text>
              </View>
              <Text style={{ fontSize: 16, color: 'black' }}>{this.state.restaurant.address}</Text>
              <Text style={{ fontSize: 12, color: 'black' }}>电话：{this.state.restaurant.phone}</Text>
            </View>
            <View style={style.restaurantdetail}>
              <Text style={{ marginTop: 9 }}>收藏：{this.state.restaurant.collect_num}</Text>
              {/* <Text style={{ marginTop: 9 }}>销量：888</Text> */}
              {/* <Text style={{ marginTop: 9 }}>浏览：1314</Text> */}
            </View>
            <View>
              <Text>{this.state.restaurant.description}</Text>
              <Text>{this.state.restaurant.sale_info}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                     <TouchableOpacity activeOpacity={0.5}>
                       <View 
                       style={{width:60,height:30,backgroundColor:'#d81e06'}}>
                         <Text style={{color:'white',fontSize:18,textAlign:'center'}}>收藏</Text>
                       </View>
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={0.5}>
                       <View 
                       style={{width:60,height:30,backgroundColor:'#343C47'}}>
                         <Text style={{color:'white',fontSize:18,textAlign:'center'}}>投诉</Text>
                       </View>
                     </TouchableOpacity>
                   </View>
            {this.state.cuisineList.length === 0 ? <View>
              <Text style={{ textAlign: 'center' }}>暂无菜品</Text>
            </View> : <FlatList
                data={this.state.cuisineList}
                renderItem={this._foodItem}
                initialNumToRender={2}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.isLoading}
              />}
            <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}



