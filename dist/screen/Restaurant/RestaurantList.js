import * as React from 'react';
import { Text, View, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import style from '../../styles/FoodList';
import RestaurantService from '../../services/Restaurant';
import State from '../../services/State';
export default class RestaurantList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            restaurantList: [],
            isLoading: true
        };
        this._restaurantItem = (info) => {
            let id = info.item.id;
            let cover = info.item.cover_url;
            let name = info.item.restaurantname;
            let address = info.item.address;
            return (React.createElement(View, null,
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('RestaurantDetail', {
                        id: id
                    }) },
                    React.createElement(View, null,
                        React.createElement(ImageBackground, { style: [style.foodimg, { width: '100%' }], source: { uri: `${State.getItem('host')}${cover}` } }))),
                React.createElement(Text, { style: style.foodtitle }, name),
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                    React.createElement(Text, { style: [style.foodtitle, { marginTop: 0, color: 'black' }] }, address))));
        };
    }
    timestampToDate(timestamp) {
        var date = new Date(timestamp), Y = date.getFullYear(), M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1), D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()), hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()), minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()), second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second });
    }
    async getRestaulist() {
        try {
            let result = await RestaurantService.GetAllRestaurant({
                method: 'collect_num',
                way: 'desc'
            });
            if (result.stat === '1') {
                this.setState({
                    restaurantList: result.restaurant,
                    isLoading: false
                });
                Toast.show('喵~加载好啦');
            }
            else if (result.stat === '0') {
                Toast.show('暂无餐厅，敬请期待');
            }
        }
        catch (error) {
            Toast.show('获取失败');
        }
    }
    componentWillMount() {
        this.getRestaulist();
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(ScrollView, { style: { marginBottom: 3 } },
                this.state.restaurantList === null ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center', marginTop: 20 } }, "\u6682\u65E0\u9910\u5385\u63A8\u8350\uFF0C\u656C\u8BF7\u671F\u5F85")) : React.createElement(FlatList, { data: this.state.restaurantList, renderItem: this._restaurantItem, keyExtractor: (item, index) => index.toString(), initialNumToRender: 2, onRefresh: this.getRestaulist, refreshing: this.state.isLoading }),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
