import * as React from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight, ImageBackground, TextInput, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import Toast from 'react-native-simple-toast'
import resstyle from '../../styles/RestaurantDetail'
import shopstyle from '../../styles/ShoppngCart'
import State from '../../services/State'

import * as model from '../../interface/Model'
import OrderService from '../../services/Order'

interface State {
    shoppingcart: model.CartInfo,
    appoint_time: number,
    comment: string
    pickerValue: string
    isLoading: boolean
}

export default class Shopping_cart extends React.Component<NavigationScreenProps, State> {

    state: State = {
        shoppingcart: {
            id: null,
            userId: null,
            restauinfo: {
                id: null,
                restaurantname: ''
            },
            cuisinelist: []
        },
        appoint_time: null,
        comment: '',
        pickerValue: '30min',
        isLoading: true
    }

    // _foodItem = (info) => {
    //     let id = info.item.id;
    //     let name = info.item.c_name;
    //     // let origin_price = info.item.origin_price
    //     let price = info.item.price;
    //     let url = info.item.cover_url

    //     return (
    //         <TouchableHighlight onPress={() => this.props.navigation.push('FoodDetail', { id: id })}>
    //             <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 150, width: '100%' }}>
    //                 <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')} />
    //                 <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
    //                     <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{name}</Text>
    //                     {/* <Text style={{fontSize:16}}>川胖子</Text> */}
    //                     {/* <Text style={{color:'black',marginTop: 10}}>原价：￥{origin_price}</Text> */}
    //                     <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 10 }}>现价：￥{price}</Text>
    //                     <View>
    //                         <Text>数量：</Text>
    //                         <TextInput placeholder='请输入手机号' placeholderTextColor='#dcdcdc' keyboardType='numeric'
    //                             maxLength={11} onChangeText={(text) => { this.setState({ phone: text }) }} selectionColor='black'
    //                             defaultValue={item}
    //                             value={this.state.phone} underlineColorAndroid='transparent'
    //                             style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
    //                     </View>
    //                 </View>
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }

    setCuinum(index: number, num: string) {
        this.state.shoppingcart.cuisinelist[index].num = num
        this.setState({
            shoppingcart: this.state.shoppingcart
        })
    }

    setAppoint(value: string) {
        switch (value) {
            case '30min':
                {
                    let timestamp = new Date().valueOf()
                    let appoint_time = timestamp + 30 * 60 * 1000
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    })
                }
                break
            case 'onehour':
                {
                    let timestamp = new Date().valueOf()
                    let appoint_time = timestamp + 60 * 60 * 1000
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    })
                }
                break
            case 'twohour':
                {
                    let timestamp = new Date().valueOf()
                    let appoint_time = timestamp + 2 * 60 * 60 * 1000
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    })
                }
                break
        }
    }

    refreshCart() {
        this.setState({
            shoppingcart: State.getItem('shopping_cart')
        })
    }

    clearCart() {
        let emptycart = {
            id: null,
            userId: null,
            restauinfo: {
                id: null,
                restaurantname: ''
            },
            cuisinelist: []
        }
        State.setItem('shopping_cart', emptycart)
        this.setState({
            shoppingcart: State.getItem('shopping_cart'),
            pickerValue: '30min',
            comment: ''
        })
    }

    async CreateOrder() {
        try {
            let cuisines = []
            this.state.shoppingcart.cuisinelist.map((item, index) => {
                cuisines.push({
                    id: item.id,
                    num: parseInt(item.num)
                })
            })
            let result = await OrderService.UserCreateOrder({
                buyer_id: this.state.shoppingcart.userId,
                restau_id: this.state.shoppingcart.restauinfo.id,
                cuisine_id: cuisines,
                comment: this.state.comment,
                appoint_time: this.state.appoint_time
            })
            if (result.price !== 0) {
                // Toast.show(result.price.toString())
                let price = result.price
                this.props.navigation.push('OrderSuccess', {
                    price: price
                })
            } else if (result.price === 0) {
                this.props.navigation.push('OrderFailed')
            }
        } catch (error) {
            Toast.show(error)
        }
    }

    componentWillMount() {
        // let cart = {
        //     id: 1,
        //     userId: 1,
        //     restauinfo: {
        //         id: 1,
        //         restaurantname: '川胖子'
        //     },
        //     cuisinelist: [{
        //         id: 1,
        //         c_name: '回锅肉',
        //         price: 30,
        //         cover_url: '',
        //         num: 1
        //     }, {
        //         id: 2,
        //         c_name: '麻婆豆腐',
        //         price: 20,
        //         cover_url: '',
        //         num: 1
        //     }]
        // }
        if (State.getItem('shopping_cart') !== null)
            // Toast.show(JSON.stringify(State.getItem('shopping_cart')))
            this.setState({
                shoppingcart: State.getItem('shopping_cart')
            })
    }

    componentWillReceiveProps() {
        this.setState({
            shoppingcart: State.getItem('shopping_cart')
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView>
                    <View style={[shopstyle.restaushow, { justifyContent: 'space-between' }]}>
                        <TouchableHighlight onPress={() => this.clearCart()}>
                            <Text style={shopstyle.restauname}>清空购物车</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.refreshCart()}>
                            <Image source={require('../../../assets/refresh.png')} style={{ width: 25, height: 25 }}></Image>
                        </TouchableHighlight>
                    </View>
                    <View style={shopstyle.restaushow}>
                        <Image source={require('../../../assets/shop.png')} style={{ width: 25, height: 25 }}></Image>
                        <Text
                            style={shopstyle.restauname}>
                            {this.state.shoppingcart.restauinfo.restaurantname}
                        </Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {this.state.shoppingcart.cuisinelist.length === 0 ?
                            <Text style={{ fontSize: 16, textAlign: "center" }}>暂时没有菜品，赶快去餐厅添加吧~</Text> :
                            this.state.shoppingcart.cuisinelist.map((item, index) => {
                                return (
                                    <View key={index}
                                        style={shopstyle.fooditem}>
                                        <TouchableHighlight key={item.id}
                                            onPress={() => this.props.navigation.push('FoodDetail', { id: item.id })}>
                                            <ImageBackground style={resstyle.foodlistimg} source={{ uri: `${State.getItem('host')}${item.cover_url}` }} />
                                        </TouchableHighlight>
                                        <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                                            <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{item.c_name}</Text>
                                            {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                                            {/* <Text style={{color:'black',marginTop: 10}}>原价：￥{origin_price}</Text> */}
                                            <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 10 }}>现价：￥{item.price / 100}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{marginTop:15}}>数量：</Text>
                                                <TextInput placeholder='请输入数量' placeholderTextColor='#dcdcdc' keyboardType='numeric'
                                                    maxLength={3} onChangeText={(text) => { this.setCuinum(index, text) }} selectionColor='black'
                                                    // defaultValue={(item.num).toString()}
                                                    value={item.num.toString()} underlineColorAndroid='transparent'
                                                    style={{ width: '20%', height: 50, marginLeft: '2%', }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                    <Picker
                        selectedValue={this.state.pickerValue}
                        style={{ height: 50, width: 200, marginLeft: '2%', marginTop: 20 }}
                        onValueChange={(itemValue, itemIndex) => this.setAppoint(itemValue)}>
                        <Picker.Item label="30分钟后" value="30min" />
                        <Picker.Item label="一小时后" value="onehour" />
                        <Picker.Item label="两小时后" value="twohour" />
                    </Picker>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/comment.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        <TextInput placeholder='请输入备注' placeholderTextColor='#dcdcdc'
                            maxLength={100} onChangeText={(text) => { this.setState({ comment: text }) }} selectionColor='black'
                            defaultValue={this.state.comment}
                            value={this.state.comment} underlineColorAndroid='transparent'
                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.setState({ comment: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={shopstyle.separator_hori}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {this.state.shoppingcart.cuisinelist.length === 0 ? null :
                            <TouchableOpacity onPress={() => this.CreateOrder()}>
                                <View style={shopstyle.foodorder}>
                                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>点我下单</Text>
                                </View>
                            </TouchableOpacity>
                        }

                        {/* <TouchableOpacity onPress={() => this.refreshCart()}>
                            <View style={shopstyle.foodorder}>
                                <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>刷新购物车</Text>
                            </View>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => this.props.navigation.push('Order',{
                 
              })}>
                <View style={style.foodorder}>
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>点我下单</Text>
                </View>
              </TouchableOpacity> */}
                    </View>
                    <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
                </ScrollView>
            </View>
        )
    }

}