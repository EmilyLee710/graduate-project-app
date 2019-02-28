import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class Order extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            numoffood: 1
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
                    React.createElement(View, { style: { flexDirection: 'row', width: 80, marginTop: 20, justifyContent: 'space-between' } },
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.numCutdown() },
                            React.createElement(EvilIcons, { name: 'minus', color: '#d81e06', size: 25, style: { marginTop: 10 } })),
                        React.createElement(Text, { style: { marginTop: 10 } }, this.state.numoffood),
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.numIncrease() },
                            React.createElement(EvilIcons, { name: 'plus', color: '#d81e06', size: 25, style: { marginTop: 10 } }))))),
            React.createElement(View, { style: { marginLeft: 10, flexDirection: 'row', marginTop: 10 } },
                React.createElement(Text, { style: { color: 'black', marginTop: 2 } }, "\u603B\u91D1\u989D\uFF1A"),
                React.createElement(Text, { style: { color: '#d81e06', fontSize: 16 } }, "20")),
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Ordersuccess') },
                    React.createElement(View, { style: { width: 100, height: 46, backgroundColor: '#d81e06' } },
                        React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u786E\u8BA4\u4E0B\u5355")))),
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.push('Orderfailed') },
                    React.createElement(View, { style: { width: 100, height: 46, backgroundColor: '#d81e06' } },
                        React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u4E0B\u5355\u5931\u8D25"))))));
    }
}
