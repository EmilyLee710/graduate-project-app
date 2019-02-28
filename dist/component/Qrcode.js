import * as React from 'react';
import { Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import Toast from 'react-native-simple-toast';
import CustomerService from '../services/Customer';
import style from '../styles/Qrcode';
import State from '../services/State';
export default class MineHome extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: this.props.visible,
            qrcode: ''
        };
        this.onClose = () => {
            this.setState({
                visible: false
            });
            this.props.onClose();
        };
    }
    async getCustomerQrcode() {
        try {
            let result = await CustomerService.customerQrcode();
            if (result.stat !== 'ok') {
            }
            this.setState({
                qrcode: result.qrcode
            });
        }
        catch (error) {
            Toast.show(error);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }
    componentWillMount() {
        this.getCustomerQrcode();
    }
    render() {
        return (React.createElement(Modal, { animationType: 'fade', transparent: true, visible: this.state.visible, onRequestClose: this.onClose },
            React.createElement(View, { style: style.modalWrap },
                React.createElement(View, { style: style.modalStyle },
                    React.createElement(View, { style: style.modalClose },
                        React.createElement(TouchableOpacity, { onPress: this.onClose },
                            React.createElement(Image, { source: require('../../assets/grzx_tc_gb.png') }))),
                    React.createElement(View, { style: style.modalContent },
                        React.createElement(Text, { style: { fontWeight: 'bold', fontSize: 18, color: 'black' } }, "ASSISTANCE"),
                        React.createElement(Text, { style: { fontSize: 12 } }, "\u5BA2\u6237\u670D\u52A1")),
                    React.createElement(View, { style: style.modalContent },
                        React.createElement(View, null,
                            React.createElement(Image, { source: { uri: `${State.getItem('host')}${this.state.qrcode}` }, style: { width: 82, height: 82 } })),
                        React.createElement(Text, { style: { fontWeight: 'bold', fontSize: 12, color: 'black' } }, "\u60A8\u7684\u4E13\u5C5E\u5BA2\u670D")),
                    React.createElement(View, { style: style.modalContent },
                        React.createElement(Text, { style: { fontSize: 10 } }, "\u957F\u6309\u8BC6\u522B\u4E8C\u7EF4\u7801"))))));
    }
}
