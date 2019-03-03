import * as React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import State from '../../services/State';
import MineService from '.././../services/Mine';
import Toast from 'react-native-simple-toast';
export default class Mine extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            userId: null,
            userInfo: {
                id: null,
                username: '',
                phone: '',
                address: '',
                sex: null,
                ctime: null
            }
        };
    }
    async getMyinfo(id) {
        try {
            let result = await MineService.getUserInfo({
                userID: id,
            });
            this.setState({
                userInfo: result,
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'flex-start', width: 368, height: 140 } },
                React.createElement(Image, { source: require('../../../assets/cat.png'), style: { width: 100, height: 100, borderRadius: 50, marginTop: 20, marginLeft: 20 } }),
                this.state.userId ? React.createElement(View, { style: { marginTop: 20, marginLeft: 20 } },
                    React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, this.state.userInfo.username),
                    React.createElement(TouchableHighlight, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Userinfo', {}) },
                        React.createElement(Text, { style: { marginTop: 20 } }, "\u7F16\u8F91\u4E2A\u4EBA\u4FE1\u606F"))) : React.createElement(View, null,
                    React.createElement(TouchableHighlight, { activeOpacity: 0.5, onPress: () => this.props.navigation.navigate('Login') },
                        React.createElement(Text, { style: { marginTop: 20, marginLeft: 10, fontSize: 18, color: 'black' } }, "\u70B9\u51FB\u6B64\u5904\u767B\u5F55")))),
            this.state.userId ? React.createElement(View, null,
                React.createElement(TouchableHighlight, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Userorder', {}) },
                    React.createElement(View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' } },
                        React.createElement(Image, { source: require('../../../assets/user_order.png'), style: { width: 30, height: 30, marginLeft: 20 } }),
                        React.createElement(Text, { style: { marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 } }, "\u6211\u7684\u8BA2\u5355"))),
                React.createElement(TouchableHighlight, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Usercollect', {}) },
                    React.createElement(View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' } },
                        React.createElement(Image, { source: require('../../../assets/collect.png'), style: { width: 30, height: 30, marginLeft: 20 } }),
                        React.createElement(Text, { style: { marginLeft: 10, color: 'black', fontSize: 16, marginTop: 4 } }, "\u6211\u7684\u6536\u85CF")))) : React.createElement(Text, { style: { marginTop: 20, marginLeft: 10, fontSize: 18, color: 'black' } }, "\u767B\u5F55\u540E\u53EF\u67E5\u770B\u8BA2\u5355\u4E0E\u6536\u85CF")));
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(State.getItem('userId')) !== null) {
            let array = JSON.stringify(State.getItem('userId')).split('');
            this.setState({
                userId: array[1]
            });
            this.getMyinfo(parseInt(array[1]));
        }
    }
    componentWillMount() {
    }
}
