import * as React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class Userconfirm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            password: ''
        };
    }
    render() {
        return (React.createElement(View, { style: { height: 700, backgroundColor: 'white' } },
            React.createElement(Text, { style: { marginTop: 20, fontSize: 18, color: 'black' } }, "\u8BF7\u8F93\u5165\u539F\u5BC6\u7801\uFF1A"),
            React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                React.createElement(Image, { source: require('../../../assets/passwd.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u539F\u5BC6\u7801', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 20, onChangeText: (text) => { this.setState({ password: text }); }, selectionColor: 'black', defaultValue: this.state.password, value: this.state.password, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                React.createElement(TouchableOpacity, { onPress: () => this.setState({ password: '' }) },
                    React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
            React.createElement(View, { style: style.separator_hori }),
            React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('UserEditpwd') },
                React.createElement(View, { style: style.foodorder },
                    React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u786E\u8BA4\u63D0\u4EA4")))));
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
