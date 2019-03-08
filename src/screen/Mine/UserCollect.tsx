import * as React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableHighlight, ImageBackground, Image, TextInput, TouchableOpacity, Picker } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import { FoodlistItem, ResListItem } from '../../interface/Model'

import style from '../../styles/UserCollect'
import State from '../../services/State';
import MineService from '../../services/Mine'

interface Params {
    id: string
}

interface State {
    cui_collect: FoodlistItem[],
    res_collect: ResListItem[],
    isLoading: boolean
}

export default class UserCollect extends React.Component<NavigationScreenProps<Params>, State>{
    state: State = {
        cui_collect: [{
            id: null,
            c_name: '',
            tag: '',
            price: null,
            cover_url: '',
            origin_price: null,
            restau_name: '',
            ctime: null
        }],
        res_collect: [{
            id: null,
            cover_url: '',
            restaurantname: '',
            address: ''
        }],
        isLoading: false
    }

    _foodItem = (info) => {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.push('FoodDetail', { id: '1' })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' }}>
                    <ImageBackground style={style.foodlistimg} source={{uri:`${State.getItem('host')}${info.item.cover_url}`}} />
                    <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                        <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{info.item.c_name}</Text>
                        {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                        <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 0 }}>现价：￥{info.item.price/100}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _restauItem = (info) => {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.push('RestaurantDetail', { id: '1' })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' }}>
                    <ImageBackground style={style.foodlistimg} source={{uri:`${State.getItem('host')}${info.item.cover_url}`}} />
                    <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                        <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{info.item.restaurantname}</Text>
                        {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                        <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 0 }}>地址：{info.item.address}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    async getCollectInfo() {
        let array = JSON.stringify(State.getItem('userId')).split('')
        let id = parseInt(array[1])
        // Toast.show(array[1])
        try {
            let result = await MineService.GetCollect({
                UserId: id,
            })
            // Toast.show(JSON.stringify(result))
            // let cuisinelist = result.cuisine.map((item, index) => {
            //     return item
            // })
            // let restaurantlist = result.restaurant.map((item, index) => {
            //     return item
            // })
            this.setState({
                cui_collect: result.cuisine,
                res_collect:result.restaurant
            })
             
        } catch (error) {
            Toast.show(error)
        }
    }

    componentWillMount(){
        this.getCollectInfo()
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={require('../../../assets/cuisine.png')}
                            style={{ width: 30, height: 30, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 }}>收藏的菜品</Text>
                    </View>
                    {this.state.cui_collect.length === 0 ? <View>
                        <Text style={{ textAlign: 'center' }}>暂无收藏菜品，快去收藏一个吧</Text>
                    </View> : <FlatList
                            data={this.state.cui_collect}
                            renderItem={this._foodItem}
                            initialNumToRender={2}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.isLoading}
                        />}
                </View>
                <View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={require('../../../assets/restaurant.png')}
                            style={{ width: 30, height: 30, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 }}>收藏的餐厅</Text>
                    </View>
                    {this.state.res_collect.length === 0 ? <View>
                        <Text style={{ textAlign: 'center' }}>暂无收藏餐厅，快去收藏一个吧</Text>
                    </View> : <FlatList
                            data={this.state.res_collect}
                            renderItem={this._restauItem}
                            initialNumToRender={2}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.isLoading}
                        />}
                </View>
                <Text style={{ marginTop: 20, textAlign: 'center' }}>—————————— 没有更多啦 ——————————</Text>
            </View>
        )
    }
}