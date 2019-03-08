import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import FoodService from '../../services/Food';
import style from '../../styles/FoodDetail';
import State from '../../services/State';
export default class BidDetails extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            id: null,
            foodInfo: {
                id: null,
                c_name: '',
                price: null,
                cover_url: '',
                detail_url: '',
                origin_price: null,
                sell_num: null,
                collect_num: null,
                restau_id: null,
                restau_name: '',
                ctime: 0,
                tag: ''
            },
            shoppingcart: {
                id: null,
                userId: null,
                restauinfo: {
                    id: null,
                    restaurantname: ''
                },
                cuisinelist: []
            },
            isLoading: true
        };
    }
    timestampToDate(timestamp) {
        var date = new Date(timestamp), Y = date.getFullYear(), M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1), D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()), hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()), minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()), second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second });
    }
    async getFoodinfo() {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await FoodService.GetCuisineInfo({
                CuisineId: id,
            });
            if (result.stat !== '1') {
                throw result.stat;
            }
            else {
                this.setState({
                    id: result.cuisine.id,
                    foodInfo: result.cuisine,
                });
            }
        }
        catch (error) {
            Toast.show(error);
        }
    }
    async collectCuisine() {
        try {
            const id = this.props.navigation.state.params.id;
            if (State.getItem('userId') === null) {
                Toast.show('请登录');
                this.props.navigation.push('Login');
            }
            else {
                let array = JSON.stringify(State.getItem('userId')).split('');
                let userid = parseInt(array[1]);
                let result = await FoodService.UserCollectCuisine({
                    cuisineID: id,
                    UserId: userid
                });
                if (result.stat === '1') {
                    Toast.show('收藏成功');
                }
                else {
                    Toast.show('收藏失败');
                    throw result.stat;
                }
            }
        }
        catch (error) {
            Toast.show(error);
        }
    }
    goCreateOrder() {
        if (State.getItem('userId') === null) {
            Toast.show('请登录');
            this.props.navigation.push('Login');
        }
        else {
            this.props.navigation.push('Order', {
                id: this.state.foodInfo.id
            });
        }
    }
    addShoppingcart() {
        if (State.getItem('userId') === null) {
            Toast.show('请登录');
            this.props.navigation.push('Login');
        }
        else {
            let array = JSON.stringify(State.getItem('userId')).split('');
            let user = parseInt(array[1]);
            if (State.getItem('shopping_cart') === null) {
                let cuisine_item = {
                    id: this.state.id,
                    c_name: this.state.foodInfo.c_name,
                    price: this.state.foodInfo.price,
                    cover_url: this.state.foodInfo.cover_url,
                    num: '1'
                };
                let newcart = {
                    id: 1,
                    userId: user,
                    restauinfo: {
                        id: this.state.foodInfo.restau_id,
                        restaurantname: this.state.foodInfo.restau_name
                    },
                    cuisinelist: [cuisine_item]
                };
                State.setItem('shopping_cart', newcart);
                this.setState({
                    shoppingcart: newcart
                });
                Toast.show('已加入购物车');
            }
            else {
                this.state.shoppingcart = State.getItem('shopping_cart');
                let cuisine_item = {
                    id: this.state.id,
                    c_name: this.state.foodInfo.c_name,
                    price: this.state.foodInfo.price,
                    cover_url: this.state.foodInfo.cover_url,
                    num: '1'
                };
                this.state.id = 1;
                this.state.shoppingcart.userId = user;
                this.state.shoppingcart.restauinfo = {
                    id: this.state.foodInfo.restau_id,
                    restaurantname: this.state.foodInfo.restau_name
                };
                this.state.shoppingcart.cuisinelist.push(cuisine_item);
                State.setItem('shopping_cart', this.state.shoppingcart);
                this.setState({
                    shoppingcart: this.state.shoppingcart
                });
                Toast.show('已加入购物车');
            }
        }
    }
    componentWillMount() {
        this.getFoodinfo();
        if (this.props.navigation.state.params.flag === 'restaurant') {
            this.setState({
                shoppingcart: State.getItem('shopping_cart')
            });
        }
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(ScrollView, null,
                React.createElement(View, { style: { backgroundColor: 'white' } },
                    React.createElement(ImageBackground, { style: style.foodimg, source: { uri: `${State.getItem('host')}${this.state.foodInfo.cover_url}` } },
                        React.createElement(View, { style: [style.fooding] },
                            React.createElement(Text, { style: { color: 'white', textAlign: 'center' } }, this.state.foodInfo.tag))),
                    React.createElement(View, { style: { width: '88%', marginLeft: '6%', marginTop: 9 } },
                        React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } }, this.state.foodInfo.c_name),
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } },
                                "\u73B0\u4EF7\uFF1A\uFFE5",
                                this.state.foodInfo.price / 100),
                            React.createElement(Text, { style: { color: 'black' } },
                                "\u539F\u4EF7\uFF1A\uFFE5",
                                this.state.foodInfo.origin_price / 100)),
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, this.state.foodInfo.restau_name)),
                    React.createElement(View, { style: style.fooddetail },
                        React.createElement(Text, { style: { marginTop: 9 } },
                            "\u6536\u85CF\uFF1A",
                            this.state.foodInfo.collect_num),
                        React.createElement(Text, { style: { marginTop: 9 } },
                            "\u9500\u91CF\uFF1A",
                            this.state.foodInfo.sell_num)),
                    React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.collectCuisine() },
                        React.createElement(View, { style: style.foodcollect },
                            React.createElement(Text, { style: { color: 'white', fontSize: 18, textAlign: 'center' } }, "\u6536\u85CF"))),
                    React.createElement(View, { style: { width: '100%', height: 300, marginTop: 10 } },
                        React.createElement(Image, { source: { uri: `${State.getItem('host')}${this.state.foodInfo.detail_url}` }, style: { width: '100%', height: 300 } })),
                    React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-around' } },
                        React.createElement(TouchableOpacity, { onPress: () => this.goCreateOrder() },
                            React.createElement(View, { style: style.foodorder },
                                React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u70B9\u6211\u4E0B\u5355"))),
                        this.props.navigation.state.params.flag === 'restaurant' ?
                            React.createElement(TouchableOpacity, { onPress: () => this.addShoppingcart() },
                                React.createElement(View, { style: style.foodorder },
                                    React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u52A0\u5165\u8D2D\u7269\u8F66"))) : null)),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
