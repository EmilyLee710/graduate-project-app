import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
let timeId = 0;
export default class CountDown extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            time: this.props.time,
            color: this.props.color,
            flag: this.props.flag,
            margin: this.props.margin,
        };
    }
    cut() {
        this.setState({
            time: this.state.time - 1000
        });
    }
    componentDidMount() {
        timeId = setInterval(() => this.cut(), 1000);
    }
    componentWillUnmount() {
        clearInterval(timeId);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            time: nextProps.time
        });
    }
    render() {
        return (React.createElement(View, null, Math.floor(this.state.time / (24 * 3600 * 1000)) > 0 ? React.createElement(View, { style: [style.bidtime, { marginTop: this.state.margin }] },
            React.createElement(Text, { style: { color: 'black', marginLeft: 10 } }, this.state.flag),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor(this.state.time / (24 * 3600 * 1000))),
            React.createElement(Text, { style: { color: 'black' } }, "\u5929"),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor((this.state.time % (24 * 3600 * 1000)) / (3600 * 1000))),
            React.createElement(Text, { style: { color: 'black' } }, "\u65F6"),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor(((this.state.time % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000))),
            React.createElement(Text, { style: { color: 'black' } }, "\u5206")) : React.createElement(View, { style: [style.bidtime, { marginTop: this.state.margin }] },
            React.createElement(Text, { style: { color: 'black', marginLeft: 10 } }, this.state.flag),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor(this.state.time / (3600 * 1000))),
            React.createElement(Text, { style: { color: 'black' } }, "\u65F6"),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor((this.state.time % (3600 * 1000)) / (60 * 1000))),
            React.createElement(Text, { style: { color: 'black' } }, "\u5206"),
            React.createElement(Text, { style: { color: this.state.color } }, Math.floor(((this.state.time % (3600 * 1000)) % (60 * 1000)) / 1000)),
            React.createElement(Text, { style: { color: 'black' } }, "\u79D2"))));
    }
}
let style = StyleSheet.create({
    bidtime: {
        height: 20,
        width: 160,
        backgroundColor: 'white',
        opacity: 0.8,
        flexDirection: 'row'
    }
});
