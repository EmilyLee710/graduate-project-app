import * as React from 'react'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, TouchableHighlight, Button, ImageBackground, SectionList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import * as model from '../../interface/Model'
import style from '../../styles/FoodList'

import BidService from '../../services/Bid'
import FoodService from '../../services/Food'

import CountDown from '../../component/CountDown'
import State from '../../services/State';

interface State {
  foodList: model.FoodlistItem[],
  homeimgs: model.HomeImages[]
  isLoading: boolean
}

export default class FoodList extends React.Component<NavigationScreenProps, State> {

  state: State = {
    foodList: [],
    homeimgs: [],
    isLoading: true
  }

  _foodItem = (info) => {
    let id = info.item.id;
    let cover = info.item.cover_url;
    // let duration_time_type = info.item.duration_time_type;
    let name = info.item.c_name;
    let res_name = info.item.restau_name
    let price = info.item.price / 100;
    let origin_price = info.item.origin_price / 100;
    let pub_time = this.timestampToDate(info.item.ctime)
    // let user_number = info.item.user_number;
    // let view_count = info.item.view_count;
    // let duration_time	 = info.item.duration_time;
    // let color;
    // let status;
    // let flag;
    let tag = info.item.tag;
    // let timeToDate;
    // let formatTime;
    // if(info.item.duration_time_type === 'Now'){
    //   color = '#EB6100';
    //   status= '拍卖中'
    //   flag = '距离结束';
    //   tag = '结束';
    //   let expires_time = info.item.expires_time;
    //   timeToDate = this.timestampToDate(expires_time);
    //   // formatTime = this.getFormatTime(expires_time)
    // } else if(info.item.duration_time_type === 'Future'){
    //   color = '#5EBAA9';
    //   status = '预展中'
    //   flag = '距离开始';
    //   tag = "开始"
    //   let start_time = info.item.start_time;
    //   timeToDate = this.timestampToDate(start_time);
    //   // formatTime = this.getFormatTime(start_time)
    // } else if(info.item.duration_time_type === 'Expires'){
    //   color = '#808080';
    //   status = '已结束'
    //   flag = '结束时间';
    //   tag = '结束';
    //   let expires_time = info.item.expires_time;
    //   timeToDate = this.timestampToDate(expires_time);

    // }

    return (
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('FoodDetail', {
          id: id,
          flag: 'food'
        })}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', height: 150 }}>
            <View>
              <ImageBackground style={[style.foodimg, { height: 150 }]} source={{ uri: `${State.getItem('host')}${cover}` }}>
                <View style={style.fooding}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>{tag}</Text>
                </View>
              </ImageBackground>
            </View>
            <View>
              <View style={{ marginLeft: 10 }}>
                <Text style={style.foodtitle}>{name}</Text>
                <Text style={{ fontSize: 16 }}>{res_name}</Text>
                <Text style={{ color: 'black' }}>原价：￥{origin_price}</Text>
                <Text style={[style.foodtitle, { marginTop: 0 }]}>现价：￥{price}</Text>
                <Text style={{ marginTop: 60 }}>{pub_time}发布</Text>
                {/* <Text style={{marginTop:0}}>520人浏览</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: '#dcdcdc' }}></View>
      </View>
    )
  }

  timestampToDate(timestamp) {
    var date = new Date(timestamp),
      Y = date.getFullYear(),
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
      hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
      minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
      second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    // alert(Y+M+D);
    return (`${Y}-${M}-${D} ${hour}:${minute}`)
  }

  async getfoodList(method?: string, way?: string) {
    try {
      let result = await FoodService.GetAllCuisine({
        method,
        way
      })
      if (result.stat === '0') {
        Toast.show('暂无菜品，敬请期待')
      } else if (result.stat === '1') {
        Toast.show('喵，加载好了~')
        let foodList = result.cuisine.map((item, i) => {
          return item
        })
        this.setState({
          foodList: foodList,
          isLoading: false
        })
      } else {
        throw result.stat
      }
    } catch (error) {
      Toast.show(error)
    }
  }

  async getAllHomeImages() {
    try {
      const result = await FoodService.GetHomeSwipers()
      // if (result.stat === 'ok') {
      // console.log('getimages', result.items)
      // Toast.show(JSON.stringify(result.swiper))
      if (result.swiper.length <= 0) {
        Toast.show('暂无轮播推荐')
      } else {
        this.setState({
          homeimgs: result.swiper
        })
      }
    } catch (error) {

    }
  }

  componentWillMount() {
    // console.log('______________________________')
    // this.getAuctionMarketList();
    this.getfoodList('id', 'asc'),
    this.getAllHomeImages()
  }



  render() {
    return (
      <View style={{ backgroundColor: 'white' }} >
        <Swiper autoplay={true} height={200} showsPagination={true}
          dotColor="white" activeDotColor='#d81e06' horizontal={true} loop={true}
        >
          {this.state.homeimgs.length === 0 ?            
              <Image source={require('../../../assets/swiper_3.jpg')} style={{ width: '100%', height: 200 }}></Image>           
            : this.state.homeimgs.map((item, index) => {
              return (
                <Image key={index} source={{ uri: `${State.getItem('host')}${item.url}` }}
                  style={{ width: '100%', height: 200 }}></Image>
              )
            })}
        </Swiper>
        <View style={style.sortmention}>
          <TouchableHighlight onPress={()=>this.getfoodList('sell_num','desc')}>
            <Text style={{ color: '#d81e06', fontSize: 16 }}>按销量从高到低</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.getfoodList('collect_num','desc')}>
            <Text style={{ color: '#d81e06', fontSize: 16 }}>按收藏从高到低</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={{ marginBottom: 3, backgroundColor: 'white' }}>
          {/* <SectionList 
                  initialNumToRender={4}
                  renderItem={this._bidItem.bind(this)}
                  sections={this.state.auctionMarketList}
                  keyExtractor= {(item,index) => index}
                  onRefresh={this.getAuctionMarketList}
                  refreshing={this.state.isLoading}
                  SectionSeparatorComponent={() => <View style={{height:5,backgroundColor:'#dcdcdc'}}></View>}
                /> */}
          {/*  */}

          {this.state.foodList.length === 0 ? <View>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>暂无食品推荐，敬请期待</Text>
          </View> : <FlatList
              data={this.state.foodList}
              renderItem={this._foodItem}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={2}
              onRefresh={this.getfoodList}
              refreshing={this.state.isLoading}
            />}

          <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
        </ScrollView>
      </View>
    )
  }
}

// let style = StyleSheet.create({
//     bidimg:{
//         width: '100%',
//         height: 210,
//         marginTop:10,
//         backgroundColor: 'transparent',
//         flexDirection:'row',
//         justifyContent:'flex-start'
//     },
//     bidtitle:{
//         fontSize:16,
//         marginTop:10,
//         marginLeft:10,
//         color:'black' 
//     },
//     biding:{
//       height:20,
//       width:50,
//       backgroundColor:'#EB6100',
//       marginTop:160
//     },
//     bidtime:{
//       height:20,
//       width:160,
//       backgroundColor:'white',
//       marginTop:160,
//       opacity:0.8,
//       flexDirection:'row'
//     }
// })