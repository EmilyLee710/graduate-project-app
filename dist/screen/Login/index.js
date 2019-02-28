import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import State from '../../services/State';
import LoginService from '../../services/Login';
export default class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            phone: '',
            passwd: '',
            token: '',
            userId: 0
        };
    }
    async checkLogin(phone, passwd) {
        if (!phone) {
            Toast.show('请输入手机号');
        }
        else if (!passwd) {
            Toast.show('请输入密码');
        }
        else {
            try {
                let result = await LoginService.userLogin({
                    phone: phone,
                    passwd: passwd
                });
                if (result.stat === '1') {
                    let id = result.UserId;
                    State.setItem('userId', id);
                    this.props.navigation.navigate('Mine', {});
                }
                else {
                    Toast.show(result.stat);
                }
            }
            catch (error) {
                Toast.show(error);
            }
        }
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { marginTop: 30, marginLeft: '2%' } },
                React.createElement(Text, { style: { fontSize: 16, color: '#d81e06' } }, "Welcome"),
                React.createElement(Text, { style: { color: 'black' } }, "\u8BF7\u767B\u5F55")),
            React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Register', {}) },
                React.createElement(Text, null, "\u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F\u70B9\u51FB\u6CE8\u518C")),
            React.createElement(View, { style: { width: '100%', height: 2, backgroundColor: '#d81e06', marginTop: 30 } }),
            React.createElement(View, { style: { marginBottom: 50 } },
                React.createElement(View, { style: { flexDirection: 'row', marginTop: 50, width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/phone.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8F93\u5165\u624B\u673A\u53F7', placeholderTextColor: '#dcdcdc', keyboardType: 'numeric', maxLength: 11, onChangeText: (text) => { this.setState({ phone: text }); }, selectionColor: 'black', value: this.state.phone, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20, paddingBottom: 10 } }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ phone: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori }),
                React.createElement(View, { style: { flexDirection: 'row', marginTop: 20, width: '96%', marginLeft: '2%' } },
                    React.createElement(Image, { source: require('../../../assets/passwd.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                    React.createElement(TextInput, { placeholder: '\u8F93\u5165\u5BC6\u7801', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 16, onChangeText: (text) => { this.setState({ passwd: text }); }, selectionColor: 'black', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20, paddingBottom: 10 }, value: this.state.passwd, underlineColorAndroid: 'transparent' }),
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ passwd: '' }) },
                        React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
                React.createElement(View, { style: style.separator_hori })),
            React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.checkLogin(this.state.phone, this.state.passwd) },
                React.createElement(View, { style: style.foodorder },
                    React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u767B\u5F55")))));
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
    },
});
