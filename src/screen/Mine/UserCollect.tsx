import * as React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableHighlight, ImageBackground, Image, TextInput, TouchableOpacity, Picker } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationScreenProps } from 'react-navigation'

import { foodInfo, RestauInfo } from '../../interface/Model'

import style from '../../styles/UserCollect'

interface Params {
    id: string
}

interface State {
    cui_collect: foodInfo[],
    res_collect: RestauInfo[],
    isLoading: boolean
}

export default class UserCollect extends React.Component<NavigationScreenProps<Params>, State>{
    state: State = {
        cui_collect: [{
            id: 0,
            c_name: '麻婆豆腐',
            price: 20,
            cover_url: '',
            detail_url: '',
            origin_price: 0,
            sell_num: 100,
            collect_num: 100,
            restau_name: '川胖子',
            ctime: 0,
            tag:''
        }],
        res_collect: [{
            id: 0,
            ctime: 0,
            name: '川胖子',
            passwd: '',
            phone: '027-88888888',
            address: '',
            license: '',
            cover_url: ''
        }],
        isLoading: false
    }

    _foodItem = (info) => {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.push('FoodDetail', { id: '1' })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' }}>
                    <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')} />
                    <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                        <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{info.item.c_name}</Text>
                        {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                        <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 0 }}>{info.item.price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _restauItem = (info) => {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.push('RestaurantDetail', { id: '1' })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' }}>
                    <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')} />
                    <View style={{ marginTop: 0, marginLeft: 10, width: '65%' }}>
                        <Text style={{ fontSize: 18, marginTop: 0, color: '#d81e06' }}>{info.item.name}</Text>
                        {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                        <Text style={{ fontSize: 18, color: '#d81e06', marginTop: 0 }}>{info.item.phone}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white'}}>
                <View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={require('../../../assets/cuisine.png')}
                            style={{ width: 30, height: 30, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 }}>收藏的菜品</Text>
                    </View>
                    {this.state.cui_collect === null ? <View>
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
                    {this.state.cui_collect === null ? <View>
                        <Text style={{ textAlign: 'center' }}>暂无收藏餐厅，快去收藏一个吧</Text>
                    </View> : <FlatList
                            data={this.state.res_collect}
                            renderItem={this._restauItem}
                            initialNumToRender={2}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.isLoading}
                        />}
                </View>
                <Text style={{marginTop:20,textAlign:'center'}}>—————————— 没有更多啦 ——————————</Text> 
            </View>
        )
    }
}