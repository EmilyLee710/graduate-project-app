import * as React from 'react'
import { View, Text, FlatList, ListRenderItem, ToastAndroid, Image, TouchableOpacity,TouchableHighlight } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Toast from 'react-native-simple-toast'

import MineService from '../../services/Mine'
import * as model from '../../interface/Model'
import style from '../../styles/UserOrder'

import State from '../../services/State'

// interface Order {
//     foodName: string,
//     restaurantName: string,
//     num: number,
//     status: string,
//     time: string
// }

interface State {
    orderList: model.MyOrder[]
}

export default class Userorder extends React.Component<NavigationScreenProps, State>{

    state: State = {
        orderList: []
    }

    _ordercuiItem = (info) => {

        let id = info.item.id;
        let c_name = info.item.name;
        let num = info.item.num;
        let cover = info.item.cover_url
        // let status = info.item.status;
        // let time = info.item.time

        return (
            <TouchableHighlight onPress={()=> this.props.navigation.push('FoodDetail',{
                id:id,
                flag:'food'
            })}>
                {/* <Text>Userorder</Text> */}
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Image source={{ uri: `${State.getItem('host')}${cover}` }}
                        style={{ width: 100, height: 100 }} />
                    <View style={{ marginLeft: 10, paddingTop: 8 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>{c_name}</Text>
                        {/* <Text style={{ color: 'black' }}>{restaurant}</Text> */}
                        <Text style={{ color: 'black' }}>数量：{num}</Text>
                        {/* <Text style={{ color: '#d81e06' }}>{status}</Text> */}
                        {/* <Text>{time}</Text> */}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    async getMyOrder(){
        try{
            let array = JSON.stringify(State.getItem('userId')).split('')
            let id = parseInt(array[1])
            let result = await MineService.UserGetMyOrder({
                UserId:id
            })
            this.setState({
                orderList:result.order
            })
        } catch(error){
             Toast.show(error)
        }
    }

    componentWillMount(){
        this.getMyOrder()
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ marginTop: 20 }}>
                    {this.state.orderList === null ? <View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>暂无订单</Text>
                    </View> :
                        <View>
                            {this.state.orderList.map((item, index) => {
                                return (
                                    <View>
                                      <TouchableHighlight onPress={()=>this.props.navigation.push('RestaurantDetail',{
                                          id:item.restau_id
                                      })}>
                                          <View style={style.restaushow}>
                                            <Image source={require('../../../assets/shop.png')} style={{ width: 25, height: 25 }}></Image>
                                            <Text
                                                style={style.restauname}>
                                                {item.restau_name}
                                            </Text>
                                          </View>
                                        </TouchableHighlight>
                                        <FlatList
                                            data={item.cuisine_id}
                                            renderItem={this._ordercuiItem}
                                            initialNumToRender={2}
                                            keyExtractor={(item, index) => index.toString()}
                                        // refreshing={this.state.isLoading}
                                        />
                                    </View>
                                )
                            })}

                        </View>
                    }
                </View>
                <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
            </View>
        )
    }
}