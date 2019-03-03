import * as React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
                restau_name: '',
                ctime: null,
                tag: ''
            },
            numoffood: 1,
            comment: '加辣',
            appoint_time: ''
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
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { flexDirection: 'row', marginTop: 20, marginLeft: 10 } },
                React.createElement(Image, { source: require('../../../assets/foog_recommend.jpg'), style: { width: 100, height: 100 } }),
                React.createElement(View, { style: { marginLeft: 10 } },
                    React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, "\u9EBB\u5A46\u8C46\u8150"),
                    React.createElement(Text, { style: { color: 'black' } }, "\u5DDD\u80D6\u5B50"),
                    React.createElement(Text, null, "\u5355\u4EF7\uFF1A"))),
            React.createElement(View, { style: { marginLeft: 10, flexDirection: 'row', marginTop: 10 } },
                React.createElement(Text, { style: { color: 'black', marginTop: 2 } }, "\u603B\u91D1\u989D\uFF1A"),
                React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "20")),
            React.createElement(Picker, { selectedValue: this.state.appoint_time, style: { height: 50, width: 100, marginLeft: '2%', marginTop: 20 }, onValueChange: (itemValue, itemIndex) => this.setState({ appoint_time: itemValue }) },
                React.createElement(Picker.Item, { label: "30\u5206\u949F\u540E", value: "30min" }),
                React.createElement(Picker.Item, { label: "\u4E00\u5C0F\u65F6\u540E", value: "onehour" }),
                React.createElement(Picker.Item, { label: "\u4E24\u5C0F\u65F6\u540E", value: "twohour" })),
            React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                React.createElement(Image, { source: require('../../../assets/phone.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u5907\u6CE8', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 11, onChangeText: (text) => { this.setState({ comment: text }); }, selectionColor: 'black', defaultValue: this.state.comment, value: this.state.comment, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                React.createElement(TouchableOpacity, { onPress: () => this.setState({ comment: '' }) },
                    React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
            React.createElement(View, { style: style.separator_hori }),
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Ordersuccess') },
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
