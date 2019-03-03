import * as React from 'react';
import { View, Text, FlatList, TouchableHighlight, ImageBackground, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import style from '../../styles/UserCollect';
import State from '../../services/State';
import MineService from '../../services/Mine';
export default class UserCollect extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
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
        };
        this._foodItem = (info) => {
            return (React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('FoodDetail', { id: '1' }) },
                React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' } },
                    React.createElement(ImageBackground, { style: style.foodlistimg, source: require('../../../assets/food_cover.jpg') }),
                    React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                        React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, info.item.c_name),
                        React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 0 } }, info.item.price)))));
        };
        this._restauItem = (info) => {
            return (React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('RestaurantDetail', { id: '1' }) },
                React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', height: 100, width: '100%' } },
                    React.createElement(ImageBackground, { style: style.foodlistimg, source: require('../../../assets/food_cover.jpg') }),
                    React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                        React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, info.item.name),
                        React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 0 } }, info.item.phone)))));
        };
    }
    async getCollectInfo() {
        let array = JSON.stringify(State.getItem('userId')).split('');
        let id = parseInt(array[1]);
        try {
            let result = await MineService.GetCollect({
                UserId: id,
            });
            this.setState({
                cui_collect: result.cuisine,
                res_collect: result.restaurant
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
        this.getCollectInfo();
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(View, null,
                React.createElement(View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' } },
                    React.createElement(Image, { source: require('../../../assets/cuisine.png'), style: { width: 30, height: 30, marginLeft: 10 } }),
                    React.createElement(Text, { style: { marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 } }, "\u6536\u85CF\u7684\u83DC\u54C1")),
                this.state.cui_collect.length === 0 ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u6536\u85CF\u83DC\u54C1\uFF0C\u5FEB\u53BB\u6536\u85CF\u4E00\u4E2A\u5427")) : React.createElement(FlatList, { data: this.state.cui_collect, renderItem: this._foodItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString(), refreshing: this.state.isLoading })),
            React.createElement(View, null,
                React.createElement(View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' } },
                    React.createElement(Image, { source: require('../../../assets/restaurant.png'), style: { width: 30, height: 30, marginLeft: 10 } }),
                    React.createElement(Text, { style: { marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 } }, "\u6536\u85CF\u7684\u9910\u5385")),
                this.state.res_collect.length === 0 ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u6536\u85CF\u9910\u5385\uFF0C\u5FEB\u53BB\u6536\u85CF\u4E00\u4E2A\u5427")) : React.createElement(FlatList, { data: this.state.res_collect, renderItem: this._restauItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString(), refreshing: this.state.isLoading })),
            React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014")));
    }
}
