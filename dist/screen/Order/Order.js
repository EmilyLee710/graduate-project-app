import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons';
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
        return (React.createElement(View, { style: { backgroundColor: 'white' } },
            React.createElement(View, { style: { flexDirection: 'row', marginTop: 20, marginLeft: 10 } },
                React.createElement(Image, { source: require('../../../assets/foog_recommend.jpg'), style: { width: 70, height: 70 } }),
                React.createElement(View, { style: { marginLeft: 10 } },
                    React.createElement(Text, { style: { fontSize: 16, color: 'black' } }, "\u9EBB\u5A46\u8C46\u8150"),
                    React.createElement(Text, { style: { color: 'black' } }, "\u5DDD\u80D6\u5B50"),
                    React.createElement(View, { style: { flexDirection: 'row', width: 60, marginTop: 20 } },
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.numCutdown() },
                            React.createElement(AntDesign, { name: 'minuscircleo', color: '#d81e06', size: 25 })),
                        React.createElement(Text, null, this.state.numoffood),
                        React.createElement(TouchableOpacity, { activeOpacity: 0.5, onPress: () => this.numIncrease() },
                            React.createElement(AntDesign, { name: 'pluscircleo', color: '#d81e06', size: 25 })))))));
    }
}
