import * as React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
export default class Userorder extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
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
        };
        this._orderItem = (info) => {
            let food = info.item.foodName;
            let restaurant = info.item.restaurantName;
            let num = info.item.num;
            let status = info.item.status;
            let time = info.item.time;
            return (React.createElement(View, null,
                React.createElement(View, { style: { flexDirection: 'row', marginLeft: 10 } },
                    React.createElement(Image, { source: require('../../../assets/foog_recommend.jpg'), style: { width: 100, height: 100 } }),
                    React.createElement(View, { style: { marginLeft: 10, paddingTop: 8 } },
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, food),
                        React.createElement(Text, { style: { color: 'black' } }, restaurant),
                        React.createElement(Text, { style: { color: 'black' } },
                            "\u6570\u91CF\uFF1A",
                            num),
                        React.createElement(Text, { style: { color: '#d81e06' } }, status),
                        React.createElement(Text, null, time)))));
        };
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(View, { style: { marginTop: 20 } }, this.state.orderList === null ? React.createElement(View, null,
                React.createElement(Text, { style: { textAlign: 'center', fontSize: 18, color: 'black' } }, "\u6682\u65E0\u8BA2\u5355")) : React.createElement(FlatList, { data: this.state.orderList, renderItem: this._orderItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString() })),
            React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014")));
    }
}
