import * as React from 'react';
import { Text, View, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import style from '../../styles/FoodList';
import BidService from '../../services/Bid';
export default class RestaurantList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            auctionMarketList: [],
            isLoading: true
        };
        this._restaurantItem = (info) => {
            return (React.createElement(View, null,
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('RestaurantDetail', { id: '1' }) },
                    React.createElement(View, null,
                        React.createElement(ImageBackground, { style: [style.foodimg, { width: '100%' }], source: require('../../../assets/restaurant_cover.jpg') }))),
                React.createElement(Text, { style: style.foodtitle }, "\u5DDD\u80D6\u5B50"),
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                    React.createElement(Text, { style: [style.foodtitle, { marginTop: 0, color: 'black' }] }, "\u534E\u4E2D\u5E08\u8303\u5927\u5B66\u5357\u95E8"))));
        };
    }
    timestampToDate(timestamp) {
        var date = new Date(timestamp), Y = date.getFullYear(), M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1), D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()), hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()), minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()), second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second });
    }
    async getAuctionMarketList() {
        try {
            let result = await BidService.auctionMarketList({
                token: null,
                type: "All",
                pageIndex: 0,
                pageSize: 100,
                sort: "ctime",
                order: "desc"
            });
            if (result.stat !== 'ok') {
            }
            Toast.show('数据加载成功');
            let auctionMarkets = result.items.map((item, i) => {
                return item;
            });
            this.setState({
                auctionMarketList: auctionMarkets,
                isLoading: false
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(ScrollView, { style: { marginBottom: 3 } },
                this.state.auctionMarketList === null ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u4E13\u573A")) : React.createElement(FlatList, { data: this.state.auctionMarketList, renderItem: this._restaurantItem, keyExtractor: (item, index) => index.toString(), initialNumToRender: 2, onRefresh: this.getAuctionMarketList, refreshing: this.state.isLoading }),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
