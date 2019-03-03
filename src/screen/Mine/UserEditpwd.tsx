import * as React from 'react'
import { View, StyleSheet, Text, FlatList, ListRenderItem, ToastAndroid, Image, TextInput, TouchableOpacity, Picker, TouchableHighlight } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import State from '../../services/State'
import MineService from '../../services/Mine'

interface State {
    newpassword: string
}

export default class Userconfirm extends React.Component<NavigationScreenProps, State>{
    state: State = {
        newpassword: ''
    }

    render() {
        return (
            <View style={{height:700,backgroundColor:'white'}}>
                <Text style={{ marginLeft:'2%',marginTop: 20, fontSize: 18, color: 'black' }}>请输入新密码：</Text>
                <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                    <Image source={require('../../../assets/passwd.png')}
                        style={{ width: 25, height: 25, marginTop: 30 }} />
                    <TextInput placeholder='请输入新密码' placeholderTextColor='#dcdcdc' keyboardType='default'
                        maxLength={20} onChangeText={(text) => { this.setState({ newpassword: text }) }} selectionColor='black'
                        defaultValue={this.state.newpassword}
                        value={this.state.newpassword} underlineColorAndroid='transparent'
                        style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                    <TouchableOpacity onPress={() => this.setState({ newpassword: '' })}>
                        <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={style.separator_hori}></View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Mine')}>
                    <View style={style.foodorder}>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>提交新密码</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
  })