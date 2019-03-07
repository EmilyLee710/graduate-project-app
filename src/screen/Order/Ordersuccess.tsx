import * as React from 'react'
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

interface Params {
    price: number
}

export default class Order extends React.Component<NavigationScreenProps<Params>>{
    render() {
        return (
            <View style={{ backgroundColor: 'white', height: 700 }}>
                {/* <Text>OrderSuccess</Text> */}
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <EvilIcons name='check' color='#d81e06' size={100} />
                </View>
                <Text style={{ color: 'black', fontSize: 18 }}>总金额：{this.props.navigation.state.params.price / 100}</Text>
                <Text style={{ fontSize: 16, color: 'black', textAlign: 'center', marginTop: 20 }}>下单成功，餐厅马上为您准备</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('FoodList')}>
                        <View style={{ width: 100, height: 46, backgroundColor: '#d81e06' }}>
                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>回到首页</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}