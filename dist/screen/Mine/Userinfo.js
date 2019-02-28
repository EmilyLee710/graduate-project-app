import * as React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class Userinfo extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            username: '阿滢',
            passwd: '88888888',
            sex: '女',
            phone: '18171011645',
            address: '湖北省武汉市洪山区'
        };
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, null,
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/user_info.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u540D', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 20, onChangeText: (text) => { this.setState({ username: text }); }, selectionColor: 'black', defaultValue: this.state.username, value: this.state.username, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ username: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/passwd.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801,\u6700\u957F16\u4F4D', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 16, onChangeText: (text) => { this.setState({ passwd: text }); }, selectionColor: 'black', defaultValue: this.state.passwd, value: this.state.passwd, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ passwd: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/userinfo_sex.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(Picker, { selectedValue: this.state.sex, style: { height: 50, width: 100, marginLeft: '2%', marginTop: 20 }, onValueChange: (itemValue, itemIndex) => this.setState({ sex: itemValue }) },
                        React.createElement(Picker.Item, { label: "\u7537", value: "man" }),
                        React.createElement(Picker.Item, { label: "\u5973", value: "woman" }),
                        React.createElement(Picker.Item, { label: "\u4FDD\u5BC6", value: "secret" }))),
                React.createElement(View, { style: style.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/phone.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 11, onChangeText: (text) => { this.setState({ phone: text }); }, selectionColor: 'black', defaultValue: this.state.phone, value: this.state.phone, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ phone: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/userinfo_address.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u5730\u5740', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 30, onChangeText: (text) => { this.setState({ address: text }); }, selectionColor: 'black', defaultValue: this.state.address, value: this.state.address, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ address: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori })),
            React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Mine') },
                React.createElement(View, { style: style.foodorder },
                    React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u63D0\u4EA4\u4FEE\u6539")))));
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
