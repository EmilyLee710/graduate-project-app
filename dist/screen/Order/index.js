import * as React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import OrderService from '../../services/Order';
import FoodService from '../../services/Food';
import State from '../../services/State';
export default class Order extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
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
                ctime: null,
                tag: ''
            },
            numoffood: 1,
            comment: '',
            appoint_time: null,
            pickervalue: '30min'
        };
    }
    numCutdown() {
        if (this.state.numoffood > 1) {
            this.setState({
                numoffood: this.state.numoffood - 1
            });
        }
    }
    numIncrease() {
        if (this.state.numoffood > 1) {
            this.setState({
                numoffood: this.state.numoffood + 1
            });
        }
    }
    setAppoint(value) {
        switch (value) {
            case '30min':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 30 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickervalue: value
                    });
                }
                break;
            case 'onehour':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 60 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickervalue: value
                    });
                }
                break;
            case 'twohour':
                {
                    let timestamp = new Date().valueOf();
                    let appoint_time = timestamp + 2 * 60 * 60 * 1000;
                    this.setState({
                        appoint_time: appoint_time,
                        pickervalue: value
                    });
                }
                break;
        }
    }
    async createOrder() {
        try {
            let array = JSON.stringify(State.getItem('userId')).split('');
            let buyer = parseInt(array[1]);
            let result = await OrderService.UserCreateOrder({
                buyer_id: buyer,
                restau_id: this.state.foodInfo.restau_id,
                cuisine_id: [{ id: this.state.foodInfo.id, num: this.state.numoffood }],
                comment: this.state.comment,
                appoint_time: this.state.appoint_time
            });
            if (result.price !== 0) {
                Toast.show(result.price.toString());
                let price = result.price;
                this.props.navigation.push('Ordersuccess', {
                    price: price
                });
            }
            else if (result.price === 0) {
                this.props.navigation.push('Orderfailed');
            }
        }
        catch (error) {
        }
    }
    async getFoodInfo() {
        try {
            const id = this.props.navigation.state.params.id;
            let result = await FoodService.GetCuisineInfo({
                CuisineId: id
            });
            if (result.stat === '1') {
                this.setState({
                    foodInfo: result.cuisine
                });
            }
            else if (result.stat === '0') {
                Toast.show('获取失败');
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
        this.getFoodInfo();
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { flexDirection: 'row', marginTop: 20, marginLeft: 10 } },
                React.createElement(Image, { source: { uri: `${State.getItem('host')}${this.state.foodInfo.cover_url}` }, style: { width: 100, height: 100 } }),
                React.createElement(View, { style: { marginLeft: 10 } },
                    React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, this.state.foodInfo.c_name),
                    React.createElement(Text, { style: { color: 'black' } }, this.state.foodInfo.restau_name),
                    React.createElement(Text, null,
                        "\u5355\u4EF7\uFF1A\uFFE5",
                        this.state.foodInfo.price / 100))),
            React.createElement(Picker, { selectedValue: this.state.pickervalue, style: { height: 50, width: 200, marginLeft: '2%', marginTop: 20 }, onValueChange: (itemValue, itemIndex) => this.setAppoint(itemValue) },
                React.createElement(Picker.Item, { label: "30\u5206\u949F\u540E", value: "30min" }),
                React.createElement(Picker.Item, { label: "\u4E00\u5C0F\u65F6\u540E", value: "onehour" }),
                React.createElement(Picker.Item, { label: "\u4E24\u5C0F\u65F6\u540E", value: "twohour" })),
            React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                React.createElement(Image, { source: require('../../../assets/comment.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u5907\u6CE8', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 100, onChangeText: (text) => { this.setState({ comment: text }); }, selectionColor: 'black', defaultValue: this.state.comment, value: this.state.comment, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                React.createElement(TouchableOpacity, { onPress: () => this.setState({ comment: '' }) },
                    React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
            React.createElement(View, { style: style.separator_hori }),
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.createOrder() },
                    React.createElement(View, { style: { width: 100, height: 46, backgroundColor: '#d81e06' } },
                        React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u786E\u8BA4\u4E0B\u5355"))))));
    }
}
let style = StyleSheet.create({
    separator_hori: {
        width: '96%',
        height: 1,
        marginLeft: '2%',
        backgroundColor: '#d81e06'
    }, foodorder: {
        width: '60%',
        marginTop: 20,
        marginLeft: '20%',
        height: 50,
        backgroundColor: '#d81e06'
    }
});
