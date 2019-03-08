import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import style from '../../styles/FoodList';
import FoodService from '../../services/Food';
import State from '../../services/State';
export default class FoodList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            foodList: [],
            homeimgs: [],
            isLoading: true
        };
        this._foodItem = (info) => {
            let id = info.item.id;
            let cover = info.item.cover_url;
            let name = info.item.c_name;
            let res_name = info.item.restau_name;
            let price = info.item.price / 100;
            let origin_price = info.item.origin_price / 100;
            let pub_time = this.timestampToDate(info.item.ctime);
            let tag = info.item.tag;
            return (React.createElement(View, null,
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('FoodDetail', {
                        id: id,
                        flag: 'food'
                    }) },
                    React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'flex-start', width: '100%', height: 150 } },
                        React.createElement(View, null,
                            React.createElement(ImageBackground, { style: [style.foodimg, { height: 150 }], source: { uri: `${State.getItem('host')}${cover}` } },
                                React.createElement(View, { style: style.fooding },
                                    React.createElement(Text, { style: { color: 'white', textAlign: 'center' } }, tag)))),
                        React.createElement(View, null,
                            React.createElement(View, { style: { marginLeft: 10 } },
                                React.createElement(Text, { style: style.foodtitle }, name),
                                React.createElement(Text, { style: { fontSize: 16 } }, res_name),
                                React.createElement(Text, { style: { color: 'black' } },
                                    "\u539F\u4EF7\uFF1A\uFFE5",
                                    origin_price),
                                React.createElement(Text, { style: [style.foodtitle, { marginTop: 0 }] },
                                    "\u73B0\u4EF7\uFF1A\uFFE5",
                                    price),
                                React.createElement(Text, { style: { marginTop: 60 } },
                                    pub_time,
                                    "\u53D1\u5E03"))))),
                React.createElement(View, { style: { width: '100%', height: 1, backgroundColor: '#dcdcdc' } })));
        };
    }
    timestampToDate(timestamp) {
        var date = new Date(timestamp), Y = date.getFullYear(), M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1), D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()), hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()), minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()), second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return (`${Y}-${M}-${D} ${hour}:${minute}`);
    }
    async getfoodList(method, way) {
        try {
            let result = await FoodService.GetAllCuisine({
                method,
                way
            });
            if (result.stat === '0') {
                Toast.show('暂无菜品，敬请期待');
            }
            else if (result.stat === '1') {
                Toast.show('喵，加载好了~');
                let foodList = result.cuisine.map((item, i) => {
                    return item;
                });
                this.setState({
                    foodList: foodList,
                    isLoading: false
                });
            }
            else {
                throw result.stat;
            }
        }
        catch (error) {
            Toast.show(error);
        }
    }
    async getAllHomeImages() {
        try {
            const result = await FoodService.GetHomeSwipers();
            if (result.swiper.length <= 0) {
                Toast.show('暂无轮播推荐');
            }
            else {
                this.setState({
                    homeimgs: result.swiper
                });
            }
        }
        catch (error) {
        }
    }
    componentWillMount() {
        this.getfoodList('id', 'asc'),
            this.getAllHomeImages();
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(Swiper, { autoplay: true, height: 200, showsPagination: true, dotColor: "white", activeDotColor: '#d81e06', horizontal: true, loop: true }, this.state.homeimgs.length === 0 ?
                React.createElement(Image, { source: require('../../../assets/swiper_3.jpg'), style: { width: '100%', height: 200 } })
                : this.state.homeimgs.map((item, index) => {
                    return (React.createElement(Image, { key: index, source: { uri: `${State.getItem('host')}${item.url}` }, style: { width: '100%', height: 200 } }));
                })),
            React.createElement(View, { style: style.sortmention },
                React.createElement(TouchableHighlight, { onPress: () => this.getfoodList('sell_num', 'desc') },
                    React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "\u6309\u9500\u91CF\u4ECE\u9AD8\u5230\u4F4E")),
                React.createElement(TouchableHighlight, { onPress: () => this.getfoodList('collect_num', 'desc') },
                    React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "\u6309\u6536\u85CF\u4ECE\u9AD8\u5230\u4F4E"))),
            React.createElement(ScrollView, { style: { marginBottom: 3, backgroundColor: 'white' } },
                this.state.foodList.length === 0 ? React.createElement(View, null,
                    React.createElement(Text, { style: { textAlign: 'center', marginTop: 20 } }, "\u6682\u65E0\u98DF\u54C1\u63A8\u8350\uFF0C\u656C\u8BF7\u671F\u5F85")) : React.createElement(FlatList, { data: this.state.foodList, renderItem: this._foodItem, keyExtractor: (item, index) => index.toString(), initialNumToRender: 2, onRefresh: this.getfoodList, refreshing: this.state.isLoading }),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
