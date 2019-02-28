import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import style from '../../styles/FoodList';
import BidService from '../../services/Bid';
export default class FoodList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            auctionMarketList: [],
            isLoading: true
        };
        this._foodItem = (info) => {
            let id = info.item.id;
            let cover = info.item.cover;
            let name = info.item.name;
            let color;
            let flag;
            let tag;
            let timeToDate;
            let formatTime;
            return (React.createElement(View, null,
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('FoodDetail', {
                        id: id
                    }) },
                    React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'flex-start' } },
                        React.createElement(View, null,
                            React.createElement(View, null,
                                React.createElement(ImageBackground, { style: style.foodimg, source: require('../../../assets/foog_recommend.jpg') },
                                    React.createElement(View, { style: style.fooding },
                                        React.createElement(Text, { style: { color: 'white', textAlign: 'center' } }, "\u5DDD\u83DC"))))),
                        React.createElement(View, null,
                            React.createElement(View, { style: { marginLeft: 10 } },
                                React.createElement(Text, { style: style.foodtitle }, "\u9EBB\u5A46\u8C46\u8150"),
                                React.createElement(Text, { style: { fontSize: 16 } }, "\u5DDD\u80D6\u5B50"),
                                React.createElement(Text, { style: [style.foodtitle, { marginTop: 0 }] }, "\uFFE520"),
                                React.createElement(Text, { style: { marginTop: 60 } }, "12\u670831\u65E5 10\u65F622\u5206\u53D1\u5E03"),
                                React.createElement(Text, { style: { marginTop: 0 } }, "520\u4EBA\u6D4F\u89C8"))))),
                React.createElement(View, { style: { width: '100%', height: 1, backgroundColor: '#dcdcdc' } })));
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
                Toast.show(result.stat.toString());
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
                React.createElement(Swiper, { autoplay: true, height: 250, showsPagination: true, dotColor: "white", activeDotColor: '#d81e06', horizontal: true, loop: true },
                    React.createElement(Image, { source: require('../../../assets/swiper_1.jpg'), style: { width: '100%', height: 250 } }),
                    React.createElement(Image, { source: require('../../../assets/swiper_2.jpg'), style: { width: '100%', height: 250 } }),
                    React.createElement(Image, { source: require('../../../assets/swiper_3.jpg'), style: { width: '100%', height: 250 } })),
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between', width: '96%', marginLeft: '2%' } },
                    React.createElement(TouchableHighlight, null,
                        React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "\u6309\u9500\u91CF\u4ECE\u9AD8\u5230\u4F4E")),
                    React.createElement(TouchableHighlight, null,
                        React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "\u6309\u6536\u85CF\u4ECE\u9AD8\u5230\u4F4E"))),
                this.state.auctionMarketList === null ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u98DF\u54C1\u63A8\u8350")) : React.createElement(FlatList, { data: this.state.auctionMarketList, renderItem: this._foodItem, keyExtractor: (item, index) => index.toString(), initialNumToRender: 2, onRefresh: this.getAuctionMarketList, refreshing: this.state.isLoading }),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
