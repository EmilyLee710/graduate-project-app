import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import BidService from '../../services/Bid';
import style from '../../styles/FoodDetail';
export default class BidDetails extends React.Component {
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
        const status = this.props.navigation.state.params.status;
        const color = this.props.navigation.state.params.color;
        const flag = this.props.navigation.state.params.flag;
        let formatTime = this.timestampToDate(this.state.auctionMarket.expires_time);
        return (React.createElement(View, null,
            React.createElement(ScrollView, null,
                React.createElement(View, { style: { backgroundColor: 'white' } },
                    React.createElement(ImageBackground, { style: style.foodimg, source: require('../../../assets/foog_recommend.jpg') },
                        React.createElement(View, { style: [style.fooding] },
                            React.createElement(Text, { style: { color: 'white', textAlign: 'center' } }, "\u5DDD\u83DC"))),
                    React.createElement(View, { style: { width: '88%', marginLeft: '6%', marginTop: 9 } },
                        React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } }, "\u9EBB\u5A46\u8C46\u8150"),
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } }, "\uFFE520")),
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, "\u5DDD\u80D6\u5B50")),
                    React.createElement(View, { style: style.fooddetail },
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u6536\u85CF\uFF1A520"),
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u9500\u91CF\uFF1A888"),
                        React.createElement(Text, { style: { marginTop: 9 } }, "\u6D4F\u89C8\uFF1A1314")),
                    React.createElement(View, { style: { marginTop: 10, width: '88%', marginLeft: '6%' } },
                        React.createElement(Text, null, "\u9EBB\u5A46\u8C46\u8150\uFF0C\u662F\u56DB\u5DDD\u7701\u4F20\u7EDF\u540D\u83DC\u4E4B\u4E00\uFF0C\u5C5E\u4E8E\u5DDD\u83DC\u3002\u4E3B\u8981\u539F\u6599\u4E3A\u914D\u6599\u548C\u8C46\u8150\uFF0C \u6750\u6599\u4E3B\u8981\u6709\u8C46\u8150\u3001\u725B\u8089\u672B\uFF08\u4E5F\u53EF\u4EE5\u7528\u732A\u8089\uFF09\u3001\u8FA3\u6912\u548C\u82B1\u6912\u7B49\u3002\u9EBB\u6765\u81EA\u82B1\u6912\uFF0C \u8FA3\u6765\u81EA\u8FA3\u6912\uFF0C\u8FD9\u9053\u83DC\u7A81\u51FA\u4E86\u5DDD\u83DC\u201C\u9EBB\u8FA3\u201D\u7684\u7279\u70B9\u3002\u5176\u53E3\u5473\u72EC\u7279\uFF0C\u53E3\u611F\u987A\u6ED1\u3002")),
                    React.createElement(TouchableOpacity, { onPress: () => this.props.navigation.push('Order') },
                        React.createElement(View, { style: style.foodorder },
                            React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u70B9\u6211\u4E0B\u5355")))),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
