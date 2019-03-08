import * as React from 'react';
import { Text, View, Image, TouchableHighlight, ImageBackground, TextInput, Picker, TouchableOpacity, ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import resstyle from '../../styles/RestaurantDetail';
import shopstyle from '../../styles/ShoppngCart';
import State from '../../services/State';
import OrderService from '../../services/Order';
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
            appoint_time: null,
            comment: '',
            pickerValue: '30min',
            isLoading: true
        };
    }
    setCuinum(index, num) {
        this.state.shoppingcart.cuisinelist[index].num = num;
        this.setState({
            shoppingcart: this.state.shoppingcart
        });
    }
    setAppoint(value) {
        switch (value) {
            case '30min':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 30 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    });
                }
                break;
            case 'onehour':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 60 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    });
                }
                break;
            case 'twohour':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 2 * 60 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickerValue: value
                    });
                }
                break;
        }
    }
    refreshCart() {
        this.setState({
            shoppingcart: State.getItem('shopping_cart')
        });
    }
    clearCart() {
        let emptycart = {
            id: null,
            userId: null,
            restauinfo: {
                id: null,
                restaurantname: ''
            },
            cuisinelist: []
        };
        State.setItem('shopping_cart', emptycart);
        this.setState({
            shoppingcart: State.getItem('shopping_cart'),
            pickerValue: '30min',
            comment: ''
        });
    }
    async CreateOrder() {
        try {
            let cuisines = [];
            this.state.shoppingcart.cuisinelist.map((item, index) => {
                cuisines.push({
                    id: item.id,
                    num: parseInt(item.num)
                });
            });
            let result = await OrderService.UserCreateOrder({
                buyer_id: this.state.shoppingcart.userId,
                restau_id: this.state.shoppingcart.restauinfo.id,
                cuisine_id: cuisines,
                comment: this.state.comment,
                appoint_time: this.state.appoint_time
            });
            if (result.price !== 0) {
                let price = result.price;
                this.props.navigation.push('OrderSuccess', {
                    price: price
                });
            }
            else if (result.price === 0) {
                this.props.navigation.push('OrderFailed');
            }
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
        if (State.getItem('shopping_cart') !== null)
            this.setState({
                shoppingcart: State.getItem('shopping_cart')
            });
    }
    componentWillReceiveProps() {
        this.setState({
            shoppingcart: State.getItem('shopping_cart')
        });
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(ScrollView, null,
                React.createElement(View, { style: [shopstyle.restaushow, { justifyContent: 'space-between' }] },
                    React.createElement(TouchableHighlight, { onPress: () => this.clearCart() },
                        React.createElement(Text, { style: shopstyle.restauname }, "\u6E05\u7A7A\u8D2D\u7269\u8F66")),
                    React.createElement(TouchableHighlight, { onPress: () => this.refreshCart() },
                        React.createElement(Image, { source: require('../../../assets/refresh.png'), style: { width: 25, height: 25 } }))),
                React.createElement(View, { style: shopstyle.restaushow },
                    React.createElement(Image, { source: require('../../../assets/shop.png'), style: { width: 25, height: 25 } }),
                    React.createElement(Text, { style: shopstyle.restauname }, this.state.shoppingcart.restauinfo.restaurantname)),
                React.createElement(View, { style: { marginTop: 20 } }, this.state.shoppingcart.cuisinelist.length === 0 ?
                    React.createElement(Text, { style: { fontSize: 16, textAlign: "center" } }, "\u6682\u65F6\u6CA1\u6709\u83DC\u54C1\uFF0C\u8D76\u5FEB\u53BB\u9910\u5385\u6DFB\u52A0\u5427~") :
                    this.state.shoppingcart.cuisinelist.map((item, index) => {
                        return (React.createElement(View, { key: index, style: shopstyle.fooditem },
                            React.createElement(TouchableHighlight, { key: item.id, onPress: () => this.props.navigation.push('FoodDetail', { id: item.id }) },
                                React.createElement(ImageBackground, { style: resstyle.foodlistimg, source: { uri: `${State.getItem('host')}${item.cover_url}` } })),
                            React.createElement(View, { style: { marginTop: 0, marginLeft: 10, width: '65%' } },
                                React.createElement(Text, { style: { fontSize: 18, marginTop: 0, color: '#d81e06' } }, item.c_name),
                                React.createElement(Text, { style: { fontSize: 18, color: '#d81e06', marginTop: 10 } },
                                    "\u73B0\u4EF7\uFF1A\uFFE5",
                                    item.price / 100),
                                React.createElement(View, { style: { flexDirection: 'row' } },
                                    React.createElement(Text, { style: { marginTop: 15 } }, "\u6570\u91CF\uFF1A"),
                                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u6570\u91CF', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 3, onChangeText: (text) => { this.setCuinum(index, text); }, selectionColor: 'black', value: item.num.toString(), underlineColorAndroid: 'transparent', style: { width: '20%', height: 50, marginLeft: '2%', } })))));
                    })),
                React.createElement(Picker, { selectedValue: this.state.pickerValue, style: { height: 50, width: 200, marginLeft: '2%', marginTop: 20 }, onValueChange: (itemValue, itemIndex) => this.setAppoint(itemValue) },
                    React.createElement(Picker.Item, { label: "30\u5206\u949F\u540E", value: "30min" }),
                    React.createElement(Picker.Item, { label: "\u4E00\u5C0F\u65F6\u540E", value: "onehour" }),
                    React.createElement(Picker.Item, { label: "\u4E24\u5C0F\u65F6\u540E", value: "twohour" })),
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/comment.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u5907\u6CE8', placeholderTextColor: '#dcdcdc', maxLength: 100, onChangeText: (text) => { this.setState({ comment: text }); }, selectionColor: 'black', defaultValue: this.state.comment, value: this.state.comment, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ comment: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: shopstyle.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'center' } }, this.state.shoppingcart.cuisinelist.length === 0 ? null :
                    React.createElement(TouchableOpacity, { onPress: () => this.CreateOrder() },
                        React.createElement(View, { style: shopstyle.foodorder },
                            React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u70B9\u6211\u4E0B\u5355")))),
                React.createElement(Text, { style: { marginTop: 20, textAlign: 'center' } }, "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 \u6CA1\u6709\u66F4\u591A\u5566 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))));
    }
}
