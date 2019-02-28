import * as React from 'react'
import { View, Text, FlatList, ListRenderItem, ToastAndroid, Image, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'

interface Order {
    foodName: string,
    restaurantName: string,
    num: number,
    status: string,
    time: string
}

interface State {
    orderList: Order[]
}

export default class Userorder extends React.Component<NavigationScreenProps, State>{

    state: State = {
        orderList: [{
            foodName: '麻婆豆腐',
            restaurantName: '川胖子',
            num: 1,
            status: '已完成',
            time: '2019-01-31 19:33:36'
        }, {
            foodName: '麻婆豆腐',
            restaurantName: '川胖子',
            num: 1,
            status: '已完成',
            time: '2019-01-31 19:33:36'
        }, {
            foodName: '麻婆豆腐',
            restaurantName: '川胖子',
            num: 1,
            status: '已完成',
            time: '2019-01-31 19:33:36'
        }]
    }

    _orderItem = (info) => {

        let food = info.item.foodName;
        let restaurant = info.item.restaurantName;
        let num = info.item.num;
        let status = info.item.status;
        let time = info.item.time

        return (
            <View>
                {/* <Text>Userorder</Text> */}
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Image source={require('../../../assets/foog_recommend.jpg')}
                        style={{ width: 100, height: 100 }} />
                    <View style={{ marginLeft: 10,paddingTop:8}}>
                        <Text style={{ fontSize: 16, color: 'black' }}>{food}</Text>
                        <Text style={{ color: 'black' }}>{restaurant}</Text>
                        <Text style={{ color: 'black' }}>数量：{num}</Text>
                        <Text style={{ color: '#d81e06' }}>{status}</Text>
                        <Text>{time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={{marginTop:20}}>
                  {this.state.orderList === null ? <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>暂无订单</Text>
                  </View> : <FlatList
                        data={this.state.orderList}
                        renderItem={this._orderItem}
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                        // refreshing={this.state.isLoading}
                  />}
                </View>
                <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
            </View>
        )
    }
}