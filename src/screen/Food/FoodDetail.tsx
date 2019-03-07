import * as React from 'react';
import * as model from '../../interface/Model'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Modal, TouchableHighlight, TouchableOpacity, Button, ImageBackground, SectionList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

// import BidService from '../../services/Bid'
import FoodService from '../../services/Food'
import CountDown from '../../component/CountDown'
import style from '../../styles/FoodDetail'
import State from '../../services/State';
import Shopping_cart from '../Shoppingcart';



interface Params {
  id: number,
  flag: string,
}

interface State {
  id: number,
  foodInfo: model.foodInfo,
  shoppingcart: model.CartInfo
  // auctionList:model.Auction[],
  // duration_time:number,
  isLoading: boolean
}

export default class BidDetails extends React.Component<NavigationScreenProps<Params>, State>{
  state: State = {
    id: null,
    foodInfo: {
      id: null,
      c_name: '',
      price: null,
      cover_url: '',
      detail_url: '',
      origin_price: null,
      sell_num: null,
      collect_num: null,
      restau_id: null,
      restau_name: '',
      ctime: 0,
      tag: ''

    },
    shoppingcart: {
      id: null,
      userId: null,
      restauinfo: {
        id: null,
        restaurantname: ''
      },
      cuisinelist: []
    },
    isLoading: true
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
    return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second })
  }

  async getFoodinfo() {
    try {
      const id = this.props.navigation.state.params.id;
      let result = await FoodService.GetCuisineInfo({
        CuisineId: id,
      })
      if (result.stat !== '1') {
        // Toast.show(result.stat)
        throw result.stat
      } else {
        // Toast.show(`${State.getItem('host')}${result.cuisine.detail_url}`)
        this.setState({
          id: result.cuisine.id,
          foodInfo: result.cuisine,
        })
      }
    } catch (error) {
      Toast.show(error)
    }
  }

  async collectCuisine() {
    try {
      const id = this.props.navigation.state.params.id;
      // Toast.show(JSON.stringify(State.getItem('userId')))  
      if (State.getItem('userId') === null) {
        Toast.show('请登录')
        this.props.navigation.push('Login')
      } else {
        let array = JSON.stringify(State.getItem('userId')).split('')
        let userid = parseInt(array[1])
        let result = await FoodService.UserCollectCuisine({
          cuisineID: id,
          UserId: userid
        })
        if (result.stat !== '1') {
          // Toast.show(result.stat)
          throw result.stat
        } else {
          Toast.show('收藏失败')
        }
      }

    } catch (error) {
      Toast.show(error)
    }
  }

  goCreateOrder() {
    if (State.getItem('userId') === null) {
      Toast.show('请登录')
      this.props.navigation.push('Login')
    } else {
      this.props.navigation.push('Order', {
        id: this.state.foodInfo.id
      })
    }
  }

  addShoppingcart() {
    if (State.getItem('userId') === null) {
      Toast.show('请登录')
      this.props.navigation.push('Login')
    } else {
      if (State.getItem('shopping_cart') === null) {  //无购物车
        let array = JSON.stringify(State.getItem('userId')).split('')
        let user = parseInt(array[1])
        let cuisine_item = {
          id: this.state.id,
          c_name: this.state.foodInfo.c_name,
          price: this.state.foodInfo.price,
          cover_url: this.state.foodInfo.cover_url,
          num: '1'
        }
        let newcart = {
          id: 1,
          userId: user,
          restauinfo: {
            id: this.state.foodInfo.restau_id,
            restaurantname: this.state.foodInfo.restau_name
          },
          cuisinelist: [cuisine_item]
        }
        State.setItem('shopping_cart', newcart)
        this.setState({
          shoppingcart: newcart
        })
        Toast.show('已加入购物车')
      } else {
        let cuisine_item = {
          id: this.state.id,
          c_name: this.state.foodInfo.c_name,
          price: this.state.foodInfo.price,
          cover_url: this.state.foodInfo.cover_url,
          num: '1'
        }
        this.state.shoppingcart.cuisinelist.push(cuisine_item)
        State.setItem('shopping_cart', this.state.shoppingcart)
        this.setState({
          shoppingcart: this.state.shoppingcart
        })
        Toast.show('已加入购物车')
      }
    }
  }

  componentWillMount() {
    // console.log('______________________________')
    // this.getAuctionMarket();
    // this.getAuctionList('ctime','desc');
    // State.setItem('showTab',false)
    this.getFoodinfo()
    if (this.props.navigation.state.params.flag === 'restaurant') {

      this.setState({
        shoppingcart: State.getItem('shopping_cart')
      })
    }
  }

  render() {
    // const status = this.props.navigation.state.params.status;
    // const color = this.props.navigation.state.params.color;
    // const flag = this.props.navigation.state.params.flag;


    return (
      <View>
        {/* <Text>拍品详情</Text> */}
        <ScrollView>
          <View style={{ backgroundColor: 'white' }}>
            <ImageBackground style={style.foodimg} source={{ uri: `${State.getItem('host')}${this.state.foodInfo.cover_url}` }}>
              <View style={[style.fooding]}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{this.state.foodInfo.tag}</Text>
              </View>
              {/* 会首先传入InitialState*/}
            </ImageBackground>
            <View style={{ width: '88%', marginLeft: '6%', marginTop: 9 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, color: '#d81e06' }}>{this.state.foodInfo.c_name}</Text>
                <Text style={{ fontSize: 18, color: '#d81e06' }}>现价：￥{this.state.foodInfo.price / 100}</Text>
                <Text style={{ color: 'black' }}>原价：￥{this.state.foodInfo.origin_price / 100}</Text>
              </View>
              <Text style={{ fontSize: 16, color: 'black' }}>{this.state.foodInfo.restau_name}</Text>
            </View>
            <View style={style.fooddetail}>
              <Text style={{ marginTop: 9 }}>收藏：{this.state.foodInfo.collect_num}</Text>
              <Text style={{ marginTop: 9 }}>销量：{this.state.foodInfo.sell_num}</Text>
              {/* <Text style={{ marginTop: 9 }}>浏览：1314</Text> */}
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.collectCuisine()}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View
                  style={{ width: 60, height: 30, backgroundColor: '#d81e06', boderRadius: 20 }}>
                  <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>收藏</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <View style={{ marginTop: 10, width: '88%', marginLeft: '6%' }}>
              <Text>麻婆豆腐，是四川省传统名菜之一，属于川菜。主要原料为配料和豆腐，
                材料主要有豆腐、牛肉末（也可以用猪肉）、辣椒和花椒等。麻来自花椒，
                       辣来自辣椒，这道菜突出了川菜“麻辣”的特点。其口味独特，口感顺滑。</Text>
            </View> */}
            <View style={{ width: '100%', height: 300 }}>
              <Image source={{ uri: `${State.getItem('host')}${this.state.foodInfo.detail_url}` }}
                style={{ width: '100%', height: 300 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => this.goCreateOrder()}>
                <View style={style.foodorder}>
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>点我下单</Text>
                </View>
              </TouchableOpacity>
              {this.props.navigation.state.params.flag === 'restaurant' ?
                <TouchableOpacity onPress={() => this.addShoppingcart()}>
                  <View style={style.foodorder}>
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>加入购物车</Text>
                  </View>
                </TouchableOpacity> : null}
              {/* <TouchableOpacity onPress={() => this.props.navigation.push('Order',{
                 
              })}>
                <View style={style.foodorder}>
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>点我下单</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
          {/* <View style={style.listheader}>
                    <TouchableOpacity onPress={()=> this.getAuctionList('ctime','desc')}>
                      <Text style={{color:'black',marginLeft:25}}>默认</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.getAuctionList('starting_price','asc')}>
                      <Text style={{marginLeft:20}}>↓价格由低到高</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.getAuctionList('starting_price','desc')}>
                      <Text style={{marginLeft:20}}>↑价格由高到低</Text>
                    </TouchableOpacity>  
                </View> */}
          <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
        </ScrollView>
      </View>
    )
  }
}

