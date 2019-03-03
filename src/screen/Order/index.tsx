import * as React from 'react'
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, Picker } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
// import AntDesign from 'react-native-vector-icons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { foodInfo } from '../../interface/Model'

interface Params {
  id: string
}

interface State {
  foodInfo: foodInfo
  numoffood: number,
  comment: string,
  appoint_time: string
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
      restau_name: '',
      ctime: null,
      tag: ''
    },
    numoffood: 1,
    comment: '加辣',
    appoint_time: ''
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

  render() {
    return (
      <View style={{ backgroundColor: 'white', height: 700 }}>
        {/* <Text>Order</Text> */}
        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
          <Image source={require('../../../assets/foog_recommend.jpg')}
            style={{ width: 100, height: 100 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>麻婆豆腐</Text>
            <Text style={{ color: 'black' }}>川胖子</Text>
            <Text>单价：</Text>
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
        <View style={{ marginLeft: 10, flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ color: 'black', marginTop: 2 }}>总金额：</Text>
          <Text style={{ color: '#d81e06', fontSize: 16 }}>20</Text>
        </View>
        <Picker
          selectedValue={this.state.appoint_time}
          style={{ height: 50, width: 100, marginLeft: '2%', marginTop: 20 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ appoint_time: itemValue })}>
          <Picker.Item label="30分钟后" value="30min" />
          <Picker.Item label="一小时后" value="onehour" />
          <Picker.Item label="两小时后" value="twohour" />
        </Picker>
        <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
            <Image source={require('../../../assets/phone.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
            <TextInput placeholder='请输入备注' placeholderTextColor='#dcdcdc' keyboardType='numeric'
              maxLength={11} onChangeText={(text) => { this.setState({ comment: text }) }} selectionColor='black'
              defaultValue={this.state.comment}
              value={this.state.comment} underlineColorAndroid='transparent'
              style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
            <TouchableOpacity onPress={() => this.setState({ comment: '' })}>
              <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={style.separator_hori}></View>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Ordersuccess')}>
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