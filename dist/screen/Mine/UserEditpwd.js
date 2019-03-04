import * as React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import State from '../../services/State';
import MineService from '../../services/Mine';
export default class Userconfirm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            newpassword: '',
            username: '',
            address: '',
            phone: '',
            sex: null
        };
    }
    async setPwd() {
        let array = JSON.stringify(State.getItem('userId')).split('');
        let userid = parseInt(array[1]);
        if (this.state.newpassword === '') {
            Toast.show('请输入新密码');
        }
        else {
            try {
                let result = await MineService.UserSetMyPwd({
                    UserId: userid,
                    pwd: this.state.newpassword,
                    username: this.state.username,
                    address: this.state.address,
                    phone: this.state.phone,
                    sex: this.state.sex
                });
                if (result.stat === '1') {
                    Toast.show('修改成功');
                    this.props.navigation.navigate('Mine');
                }
                else if (result.stat === '0') {
                    Toast.show('修改失败');
                }
            }
            catch (error) {
                Toast.show(error);
            }
        }
    }
    async getMyinfo(id) {
        try {
            let result = await MineService.getUserInfo({
                userID: id,
            });
            this.setState({
                username: result.username,
                sex: result.sex,
                phone: result.phone,
                address: result.address
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillMount() {
        let array = JSON.stringify(State.getItem('userId')).split('');
        let userid = parseInt(array[1]);
        this.getMyinfo(userid);
    }
    render() {
        return (React.createElement(View, { style: { height: 700, backgroundColor: 'white' } },
            React.createElement(Text, { style: { marginLeft: '2%', marginTop: 20, fontSize: 18, color: 'black' } }, "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF1A"),
            React.createElement(View, { style: { flexDirection: 'row', width: '96%', marginLeft: '2%' } },
                React.createElement(Image, { source: require('../../../assets/passwd.png'), style: { width: 25, height: 25, marginTop: 30 } }),
                React.createElement(TextInput, { placeholder: '\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801', placeholderTextColor: '#dcdcdc', keyboardType: 'default', maxLength: 20, onChangeText: (text) => { this.setState({ newpassword: text }); }, selectionColor: 'black', defaultValue: this.state.newpassword, value: this.state.newpassword, underlineColorAndroid: 'transparent', style: { width: '83%', height: 50, marginLeft: '2%', marginTop: 20 } }),
                React.createElement(TouchableOpacity, { onPress: () => this.setState({ newpassword: '' }) },
                    React.createElement(EvilIcons, { name: 'close', color: '#dcdcdc', size: 25, style: { marginTop: 30 } }))),
            React.createElement(View, { style: style.separator_hori }),
            React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.setPwd() },
                React.createElement(View, { style: style.foodorder },
                    React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u63D0\u4EA4\u65B0\u5BC6\u7801")))));
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
