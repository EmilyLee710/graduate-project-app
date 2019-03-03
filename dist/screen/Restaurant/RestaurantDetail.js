import * as React from 'react';
import { Text, View, ScrollView, FlatList, TouchableHighlight, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import RestaurantService from '../../services/Restaurant';
import style from '../../styles/RestaurantDetail';
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
                cover_url: ''
            },
            cuisineList: [],
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
    async getRestauinfo() {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await RestaurantService.GetRestaurantInfo({
                RestaurantId: id,
            });
            if (result.stat === '1') {
                let cuisineList = result.restaurant.cuisinelist.map((item, index) => {
                    return item;
                });
                this.setState({
                    id: result.restaurant.id,
                    restaurant: result.restaurant,
                    cuisineList: cuisineList
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
    componentWillMount() {
        this.getRestauinfo();
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
                    this.state.cuisineList === null ? React.createElement(View, null,
                        React.createElement(Text, { style: { textAlign: 'center' } }, "\u6682\u65E0\u83DC\u54C1")) : React.createElement(FlatList, { data: this.state.cuisineList, renderItem: this._foodItem, initialNumToRender: 2, keyExtractor: (item, index) => index.toString(), refreshing: this.state.isLoading }),
                    React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014")))));
    }
}
