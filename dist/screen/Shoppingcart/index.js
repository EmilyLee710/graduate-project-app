import * as React from 'react';
import { Text, View, TouchableHighlight, ImageBackground, TextInput } from 'react-native';
import style from '../../styles/RestaurantDetail';
import State from '../../services/State';
export default class Shopping_cart extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
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
    setCuinum(index, num) {
        this.state.shoppingcart.cuisinelist[index].num = parseInt(num);
        this.setState({
            shoppingcart: this.state.shoppingcart
        });
    }
    componentWillMount() {
        let cart = {
            id: 1,
            userId: 1,
            restauinfo: {
                id: 1,
                restaurantname: '川胖子'
            },
            cuisinelist: [{
                    id: 1,
                    c_name: '回锅肉',
                    price: 30,
                    cover_url: '',
                    num: 1
                }, {
                    id: 2,
                    c_name: '麻婆豆腐',
                    price: 20,
                    cover_url: '',
                    num: 1
                }]
        };
        State.setItem('shopping_cart', cart);
        this.setState({
            shoppingcart: State.getItem('shopping_cart')
        });
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(Text, { style: { marginLeft: 10, marginTop: 10, fontSize: 16, color: '#d81e06' } }, this.state.shoppingcart.restauinfo.restaurantname),
            React.createElement(View, { style: { marginTop: 20 } }, this.state.shoppingcart.cuisinelist.length === 0 ?
                React.createElement(Text, { style: { fontSize: 16, textAlign: "center" } }, "\u6682\u65F6\u6CA1\u6709\u83DC\u54C1\uFF0C\u8D76\u5FEB\u53BB\u9910\u5385\u6DFB\u52A0\u5427~") :
                this.state.shoppingcart.cuisinelist.map((item, index) => {
                    return (React.createElement(TouchableHighlight, { key: item.id, onPress: () => this.props.navigation.push('FoodDetail', { id: item.id }) },
                        React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', height: 150, width: '96%', marginLeft: '2%' } },
                            React.createElement(ImageBackground, { style: style.foodlistimg, source: require('../../../assets/food_cover.jpg') }),
                            React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                                React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, item.c_name),
                                React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 10 } },
                                    "\u73B0\u4EF7\uFF1A\uFFE5",
                                    item.price),
                                React.createElement(View, null,
                                    React.createElement(Text, null, "\u6570\u91CF\uFF1A"),
                                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 3, onChangeText: (text) => { this.setCuinum(index, text); }, selectionColor: 'black', defaultValue: (item.num).toString(), value: item.num.toString(), underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }))))));
                }))));
    }
}
