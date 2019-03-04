import * as React from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';

import Toast from 'react-native-simple-toast'
import style from '../../styles/RestaurantDetail'
import State from '../../services/State'

import * as model from '../../interface/Model'

interface State {
    shoppingcart: model.CartInfo,
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

    setCuinum(index:number,num:string){
        this.state.shoppingcart.cuisinelist[index].num = parseInt(num)
        this.setState({
            shoppingcart:this.state.shoppingcart
        })
    }

    componentWillMount(){
        let cart = {
            id: 1,
            userId: 1,
            restauinfo: {
                id: 1,
                restaurantname: '川胖子'
            },
            cuisinelist: [{
                id: 1,
                c_name: '回锅肉',
                price: 30,
                cover_url: '',
                num: 1
            }, {
                id: 2,
                c_name: '麻婆豆腐',
                price: 20,
                cover_url: '',
                num: 1
            }]
        }
        State.setItem('shopping_cart',cart)
        // Toast.show(JSON.stringify(State.getItem('shopping_cart')))
        this.setState({
            shoppingcart:State.getItem('shopping_cart')
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <Text
                    style={{ marginLeft: 10, marginTop:10,fontSize: 16, color: '#d81e06' }}>
                    {this.state.shoppingcart.restauinfo.restaurantname}</Text>
                <View style={{marginTop:20}}>
                    {this.state.shoppingcart.cuisinelist.length === 0?
                    <Text style={{fontSize:16,textAlign:"center"}}>暂时没有菜品，赶快去餐厅添加吧~</Text> :
                    this.state.shoppingcart.cuisinelist.map((item,index)=>{
                        return(
                          <TouchableHighlight key={item.id}
                          onPress={() => this.props.navigation.push('FoodDetail', { id: item.id })}>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 150, width: '96%',marginLeft:'2%' }}>
                                <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')} />
                                <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                                    <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{item.c_name}</Text>
                                    {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                                    {/* <Text style={{color:'black',marginTop: 10}}>原价：￥{origin_price}</Text> */}
                                    <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 10 }}>现价：￥{item.price}</Text>
                                    <View>
                                        <Text>数量：</Text>
                                        <TextInput placeholder='请输入手机号' placeholderTextColor='#dcdcdc' keyboardType='numeric'
                                            maxLength={3} onChangeText={(text) => { this.setCuinum(index,text) }} selectionColor='black'
                                            defaultValue={(item.num).toString()}
                                            value={item.num.toString()} underlineColorAndroid='transparent'
                                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                                    </View>
                                </View>
                            </View>
                          </TouchableHighlight>  
                        )
                    })}
                </View>
            </View>
        )
    }

}