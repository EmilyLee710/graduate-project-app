import * as React from 'react'
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, Picker, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
// import AntDesign from 'react-native-vector-icons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Toast from 'react-native-simple-toast'

import { foodInfo } from '../../interface/Model'
import OrderService from '../../services/Order'
import FoodService from '../../services/Food'
import State from '../../services/State';

interface Params {
  id: number
}

interface State {
  foodInfo: foodInfo
  numoffood: number,
  comment: string,
  appoint_time: number,
  pickervalue:string
}

export default class Order extends React.Component<NavigationScreenProps<Params>, State>{

  state: State = {
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
      ctime: null,
      tag: ''
    },
    numoffood: 1,
    comment: '',
    appoint_time: null,
    pickervalue:'30min'
  }

  numCutdown() {
    if (this.state.numoffood > 1) {
      this.setState({
        numoffood: this.state.numoffood - 1
      })
    }
  }

  numIncrease() {
    if (this.state.numoffood > 1) {
      this.setState({
        numoffood: this.state.numoffood + 1
      })
    }
  }

  setAppoint(value: string) {
    switch (value) {
      case '30min':
        {
          let timestamp = new Date().valueOf()
          let appoint_time = timestamp + 30 * 60 * 1000
          this.setState({
            appoint_time: appoint_time,
            pickervalue:value
          })
        }
        break
      case 'onehour':
        {
          let timestamp = new Date().valueOf()
          let appoint_time = timestamp + 60 * 60 * 1000
          this.setState({
            appoint_time: appoint_time,
            pickervalue:value
          })
        }
        break
      case 'twohour':
        {
          let timestamp = new Date().valueOf()
          let appoint_time = timestamp + 2* 60 * 60 * 1000
          this.setState({
            appoint_time: appoint_time,
            pickervalue:value
          })
        }
        break
    }
  }

  async createOrder() {
    try {
      let array = JSON.stringify(State.getItem('userId')).split('')
      let buyer = parseInt(array[1])
      let result = await OrderService.UserCreateOrder({
        buyer_id:buyer,
        restau_id:this.state.foodInfo.restau_id,
        cuisine_id:[{id:this.state.foodInfo.id,num:this.state.numoffood}],
        comment:this.state.comment,
        appoint_time:this.state.appoint_time
      })
      if(result.price !== 0){
        Toast.show(result.price.toString())
        let price = result.price
        this.props.navigation.push('Ordersuccess',{
          price:price
        })
      } else if(result.price === 0){
        this.props.navigation.push('Orderfailed')
      }
    } catch (error) {

    }
  }

  async getFoodInfo() {
    try {
      const id = this.props.navigation.state.params.id
      let result = await FoodService.GetCuisineInfo({
        CuisineId: id
      })
      if (result.stat === '1') {
        this.setState({
          foodInfo: result.cuisine
        })
      }
      else if (result.stat === '0') {
        Toast.show('获取失败')
      } else {
        throw result.stat
      }
    } catch (error) {
      Toast.show(error)
    }
  }

  componentWillMount() {
    this.getFoodInfo()
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', height: 700 }}>
        {/* <Text>Order</Text> */}
        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
          <Image source={{uri:`${State.getItem('host')}${this.state.foodInfo.cover_url}`}}
            style={{ width: 100, height: 100 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>{this.state.foodInfo.c_name}</Text>
            <Text style={{ color: 'black' }}>{this.state.foodInfo.restau_name}</Text>
            <Text>单价：￥{this.state.foodInfo.price/100}</Text>
            {/* <View style={{flexDirection:'row',width:80,marginTop:20,justifyContent:'space-between'}}>
                     <TouchableOpacity activeOpacity={0.5} onPress={()=>this.numCutdown()}>
                        <EvilIcons name='minus' color='#d81e06' size={25} style={{marginTop:10}}/>
                     </TouchableOpacity>
                     <Text style={{marginTop:10}}>{this.state.numoffood}</Text>
                     <TouchableOpacity activeOpacity={0.5} onPress={()=>this.numIncrease()}>
                        <EvilIcons name='plus' color='#d81e06' size={25} style={{marginTop:10}}/>
                     </TouchableOpacity>
                  </View> */}
          </View>
        </View>
        {/* <View style={{ marginLeft: 10, flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ color: 'black', marginTop: 2 }}>总金额：</Text>
          <Text style={{ color: '#d81e06', fontSize: 16 }}>20</Text>
        </View> */}
        <Picker
          selectedValue={this.state.pickervalue}
          style={{ height: 50, width: 200, marginLeft: '2%', marginTop: 20 }}
          onValueChange={(itemValue, itemIndex) => this.setAppoint(itemValue)}>
          <Picker.Item label="30分钟后" value="30min" />
          <Picker.Item label="一小时后" value="onehour" />
          <Picker.Item label="两小时后" value="twohour" />
        </Picker>
        <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
          <Image source={require('../../../assets/comment.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
          <TextInput placeholder='请输入备注' placeholderTextColor='#dcdcdc' keyboardType='numeric'
            maxLength={100} onChangeText={(text) => { this.setState({ comment: text }) }} selectionColor='black'
            defaultValue={this.state.comment}
            value={this.state.comment} underlineColorAndroid='transparent'
            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
          <TouchableOpacity onPress={() => this.setState({ comment: '' })}>
            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={style.separator_hori}></View>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.createOrder()}>
            <View style={{ width: 100, height: 46, backgroundColor: '#d81e06' }}>
              <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>确认下单</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Orderfailed')}>
            <View style={{ width: 100, height: 46, backgroundColor: '#d81e06' }}>
              <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>下单失败</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Ordersuccess')}>
                      <View style={{width:80,height:46,backgroundColor:'#d81e06'}}>
                        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:14}}>下单成功</Text>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Orderfailed')}>
                      <View style={{width:80,height:46,backgroundColor:'#d81e06'}}>
                        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:14}}>下单失败</Text>
                      </View>
                </TouchableOpacity>
              </View> */}

      </View>
    )
  }
}

let style = StyleSheet.create({
  separator_hori: {
    width: '96%',
    height: 1,
    marginLeft: '2%',
    backgroundColor: '#d81e06'
  }, foodorder: {
    width: '60%',
    marginTop: 20,
    marginLeft: '20%',
    height: 50,
    backgroundColor: '#d81e06'
  }
})