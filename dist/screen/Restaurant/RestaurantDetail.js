import * as React from 'react';
import { Text, View, ScrollView, FlatList, TouchableHighlight, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import BidService from '../../services/Bid';
import style from '../../styles/RestaurantDetail';
export default class RestaurantDetail extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            id: 0,
            auctionMarket: {
                id: 0,
                cover: '',
                name: '',
                start_time: 0,
                expires_time: 0,
                ctime: 0,
                rule: '',
                interval: '',
                market_status: '',
                auction_items: [],
                user_number: 0,
                duration_time: 0,
                duration_time_type: '',
                now_time: 0,
                isFavorites: false,
                bid_count: 0,
                done_number: 0,
                done_price: 0,
                view_count: 0,
                serial_number: ''
            },
            auctionList: [],
            duration_time: 0,
            isLoading: true
        };
        this._foodItem = (info) => {
            return (React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('FoodDetail', { id: '1' }) },
                React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', height: 150, width: '100%' } },
                    React.createElement(ImageBackground, { style: style.foodlistimg, source: require('../../../assets/food_cover.jpg') }),
                    React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                        React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, "\u9EBB\u5A46\u8C46\u8150"),
                        React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 0 } }, "\uFFE520")))));
        };
    }
    timestampToDate(timestamp) {
        var date = new Date(timestamp), Y = date.getFullYear(), M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1), D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()), hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()), minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()), second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second });
    }
    async getAuctionList(sort, order) {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await BidService.auctionList({
                marketId: id,
                token: null,
                pageIndex: 0,
                pageSize: 100,
                sort: sort,
                order: order
            });
            if (result.stat !== 'ok') {
                Toast.show(result.stat);
            }
            this.setState({
                auctionList: result.items,
                isLoading: false
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    async getAuctionMarket() {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await BidService.auctionMarket({
                marketId: id,
                token: null
            });
            if (result.stat !== 'ok') {
                Toast.show(result.stat);
            }
            this.setState({
                id: result.item.id,
                auctionMarket: result.item,
                duration_time: result.item.duration_time
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(ScrollView, null,
                React.createElement(View, { style: { backgroundColor: 'white' } },
                    React.createElement(ImageBackground, { style: style.restaurantimg, source: require('../../../assets/restaurant_cover.jpg') }),
                    React.createElement(View, { style: { width: '88%', marginLeft: '6%', marginTop: 9 } },
                        React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } }, "\u5DDD\u80D6\u5B50")),
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, "\u534E\u4E2D\u5E08\u8303\u5927\u5B66\u5357\u95E8"),
                        React.createElement(Text, { style: { fontSize: 12, color: 'black' } }, "\u7535\u8BDD\uFF1A027-88888888")),
                    React.createElement(View, { style: style.restaurantdetail },
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u6536\u85CF\uFF1A520"),
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u9500\u91CF\uFF1A888"),
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u6D4F\u89C8\uFF1A1314")),
                    this.state.auctionList === null ? React.createElement(View, null,
                        React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u83DC\u54C1")) : React.createElement(FlatList, { data: this.state.auctionList, renderItem: this._foodItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString(), refreshing: this.state.isLoading }),
                    React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014")))));
    }
}
