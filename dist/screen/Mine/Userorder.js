import * as React from 'react';
import { View, Text, FlatList, Image, TouchableHighlight, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import MineService from '../../services/Mine';
import style from '../../styles/UserOrder';
import State from '../../services/State';
export default class Userorder extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            orderList: []
        };
        this._ordercuiItem = (info) => {
            let id = info.item.id;
            let c_name = info.item.name;
            let num = info.item.num;
            let cover = info.item.cover_url;
            return (React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('FoodDetail', {
                    id: id,
                    flag: 'food'
                }) },
                React.createElement(View, { style: { flexDirection: 'row', marginLeft: 10 } },
                    React.createElement(Image, { source: { uri: `${State.getItem('host')}${cover}` }, style: { width: 100, height: 100 } }),
                    React.createElement(View, { style: { marginLeft: 10, paddingTop: 8 } },
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, c_name),
                        React.createElement(Text, { style: { color: 'black' } },
                            "\u6570\u91CF\uFF1A",
                            num)))));
        };
    }
    checkOrderStatus(type) {
        if (type === 0) {
            return '待接单';
        }
        else if (type === 1) {
            return '制作中';
        }
        else if (type === 2) {
            return '已完成';
        }
        else if (type === 3) {
            return '已拒绝';
        }
    }
    async getMyOrder() {
        try {
            let array = JSON.stringify(State.getItem('userId')).split('');
            let id = parseInt(array[1]);
            let result = await MineService.UserGetMyOrder({
                UserId: id
            });
            this.setState({
                orderList: result.order
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
        this.getMyOrder();
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(ScrollView, null,
                React.createElement(View, { style: { marginTop: 20 } }, this.state.orderList === null ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center', fontSize: 18, color: 'black' } }, "\u6682\u65E0\u8BA2\u5355")) :
                    React.createElement(View, null, this.state.orderList.map((item, index) => {
                        return (React.createElement(View, null,
                            React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('RestaurantDetail', {
                                    id: item.restau_id
                                }) },
                                React.createElement(View, { style: style.restaushow },
                                    React.createElement(Image, { source: require('../../../assets/shop.png'), style: { width: 25, height: 25 } }),
                                    React.createElement(Text, { style: style.restauname }, item.restau_name))),
                            React.createElement(FlatList, { data: item.cuisine_id, renderItem: this._ordercuiItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString() }),
                            React.createElement(View, { style: { marginTop: 10, marginLeft: 10, paddingBottom: 5 } },
                                React.createElement(Text, null,
                                    "\u8BA2\u5355\u72B6\u6001\uFF1A",
                                    this.checkOrderStatus(item.order_staus)),
                                React.createElement(Text, null,
                                    "\u8BA2\u5355\u91D1\u989D\uFF1A",
                                    item.tot_price / 100),
                                React.createElement(Text, null,
                                    "\u5907\u6CE8\uFF1A",
                                    item.comment))));
                    }))),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
