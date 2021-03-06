import * as React from 'react';
import { Text, View, ScrollView, FlatList, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import RestaurantService from '../../services/Restaurant';
import style from '../../styles/RestaurantDetail';
import State from '../../services/State';
export default class RestaurantDetail extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            id: 0,
            restaurant: {
                id: null,
                restauname: '',
                address: '',
                phone: '',
                cuisinelist: [],
                ctime: 0,
                collect_num: 0,
                description: '',
                license: '',
                cover_url: '',
                sale_info: ''
            },
            cuisineList: [],
            isLoading: true
        };
        this._foodItem = (info) => {
            let id = info.item.id;
            let name = info.item.c_name;
            let origin_price = info.item.origin_price / 100;
            let price = info.item.price / 100;
            let url = info.item.cover_url;
            return (React.createElement(TouchableHighlight, { onPress: () => this.props.navigation.push('FoodDetail', {
                    id: id,
                    flag: 'restaurant'
                }) },
                React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', height: 150, width: '100%' } },
                    React.createElement(ImageBackground, { style: style.foodlistimg, source: { uri: `${State.getItem('host')}${url}` } }),
                    React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                        React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, name),
                        React.createElement(Text, { style: { color: 'black', marginTop: 10 } },
                            "\u539F\u4EF7\uFF1A\uFFE5",
                            origin_price),
                        React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 10 } },
                            "\u73B0\u4EF7\uFF1A\uFFE5",
                            price)))));
        };
    }
    async getRestauinfo() {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await RestaurantService.GetRestaurantInfo({
                RestaurantId: id,
            });
            if (result.stat === '1') {
                this.setState({
                    id: result.restaurant.id,
                    restaurant: result.restaurant,
                    cuisineList: result.restaurant.cuisinelist
                });
                Toast.show('喵~加载好啦');
            }
            else {
                throw result.stat;
            }
        }
        catch (error) {
            Toast.show(error);
        }
    }
    async collectRestaurant() {
        try {
            const id = this.props.navigation.state.params.id;
            if (State.getItem('userId') === null) {
                Toast.show('请登录');
                this.props.navigation.push('Login');
            }
            else {
                let array = JSON.stringify(State.getItem('userId')).split('');
                let userid = parseInt(array[1]);
                let result = await RestaurantService.UserCollectRestaurant({
                    restauID: id,
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
    componentWillMount() {
        this.getRestauinfo();
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(ScrollView, null,
                React.createElement(View, { style: { backgroundColor: 'white' } },
                    React.createElement(ImageBackground, { style: style.restaurantimg, source: { uri: `${State.getItem('host')}${this.state.restaurant.cover_url}` } }),
                    React.createElement(View, { style: { width: '88%', marginLeft: '6%', marginTop: 9 } },
                        React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { fontSize: 18, color: '#d81e06' } }, this.state.restaurant.restauname)),
                        React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, this.state.restaurant.address),
                        React.createElement(Text, { style: { fontSize: 12, color: 'black' } },
                            "\u7535\u8BDD\uFF1A",
                            this.state.restaurant.phone)),
                    React.createElement(View, { style: style.restaurantdetail },
                        React.createElement(Text, { style: { marginTop: 9 } },
                            "\u6536\u85CF\uFF1A",
                            this.state.restaurant.collect_num)),
                    React.createElement(View, { style: { marginLeft: 10, paddingBottom: 5 } },
                        React.createElement(Text, null, this.state.restaurant.description),
                        React.createElement(Text, null,
                            "\u9650\u65F6\u6D3B\u52A8\uFF1A",
                            this.state.restaurant.sale_info)),
                    React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 } },
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.collectRestaurant() },
                            React.createElement(View, { style: { width: 60, height: 30, backgroundColor: '#d81e06', borderRadius: 10 } },
                                React.createElement(Text, { style: { color: 'white', fontSize: 18, textAlign: 'center' } }, "\u6536\u85CF"))),
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5 },
                            React.createElement(View, { style: { width: 60, height: 30, backgroundColor: '#343C47', borderRadius: 10 } },
                                React.createElement(Text, { style: { color: 'white', fontSize: 18, textAlign: 'center' } }, "\u6295\u8BC9")))),
                    this.state.cuisineList.length === 0 ? React.createElement(View, null,
                        React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u83DC\u54C1")) : React.createElement(FlatList, { style: { marginTop: 10 }, data: this.state.cuisineList, renderItem: this._foodItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString(), refreshing: this.state.isLoading }),
                    React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014")))));
    }
}
