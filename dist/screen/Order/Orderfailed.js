import * as React from 'react';
import { View, Text } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class Order extends React.Component {
    render() {
        return (React.createElement(View, { style: { backgroundColor: 'white', height: 700 } },
            React.createElement(View, { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' } },
                React.createElement(EvilIcons, { name: 'close-o', color: '#d81e06', size: 100 })),
            React.createElement(Text, { style: { fontSize: 16, color: 'black', textAlign: 'center', marginTop: 20 } }, "\u4E0B\u5355\u5931\u8D25\uFF0C\u8BF7\u8FD4\u56DE\u91CD\u65B0\u4E0B\u5355")));
    }
}
