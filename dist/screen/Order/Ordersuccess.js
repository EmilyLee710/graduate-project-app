import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class Order extends React.Component {
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(EvilIcons, { name: 'check', color: '#d81e06', size: 100 })),
            React.createElement(Text, { style: { color: 'black', fontSize: 18, textAlign: 'center' } },
                "\u603B\u91D1\u989D\uFF1A",
                this.props.navigation.state.params.price / 100),
            React.createElement(Text, { style: { fontSize: 16, color: 'black', textAlign: 'center', marginTop: 20 } }, "\u4E0B\u5355\u6210\u529F\uFF0C\u9910\u5385\u9A6C\u4E0A\u4E3A\u60A8\u51C6\u5907"),
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.props.navigation.navigate('FoodList') },
                    React.createElement(View, { style: { width: 100, height: 46, backgroundColor: '#d81e06', borderRadius: 10 } },
                        React.createElement(Text, { style: { fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 } }, "\u56DE\u5230\u9996\u9875"))))));
    }
}
