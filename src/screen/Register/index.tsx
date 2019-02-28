import * as React from 'react'
import { View, StyleSheet, Text, FlatList, ListRenderItem, ToastAndroid, Image, TextInput, TouchableOpacity,Picker } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import LoginService from '../../services/Login'

interface State {
    username: string,
    passwd: string,
    sex: string,
    phone: string,
    address: string
}

export default class Userinfo extends React.Component<NavigationScreenProps, State>{

    state: State = {
        username: '',
        passwd: '',
        sex: '',
        phone: '',
        address: ''
    }

    checkSex(value: string) {
        if (value === 'man') {
            return 0
        } else if (value === 'woman') {
            return 1
        } else if (value === 'secret') {
            return 2
        }
    }

    async userRegister() {

        let sex = this.state.sex;
        // Toast.show(this.state.sex)
        let sexnum = this.checkSex(sex);
        // Toast.show(sexnum.toString())
        // this.props.navigation.navigate('Login')
        try {
            let result = await LoginService.userRegister({
                username: this.state.username,
                phone: this.state.phone,
                address: this.state.address,
                sex: sexnum,
                passwd: this.state.passwd
            })
            //   Toast.show(result.stat)
            if (result.stat === '0') {
                Toast.show(result.stat)
            } else {
                Toast.show('注册成功')
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            Toast.show(error)
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: 700 }}>
                {/* <Text>Userinfo</Text> */}
                <View>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/user_info.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        <TextInput placeholder='请输入用户名' placeholderTextColor='#dcdcdc' keyboardType='default'
                            maxLength={20} onChangeText={(text) => { this.setState({ username: text }) }} selectionColor='black'
                            defaultValue={this.state.username}
                            value={this.state.username} underlineColorAndroid='transparent'
                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.setState({ username: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.separator_hori}></View>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/passwd.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        <TextInput placeholder='请输入新密码,最长16位' placeholderTextColor='#dcdcdc' keyboardType='default'
                            maxLength={16} onChangeText={(text) => { this.setState({ passwd: text }) }} selectionColor='black'
                            defaultValue={this.state.passwd}
                            value={this.state.passwd} underlineColorAndroid='transparent'
                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.setState({ passwd: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.separator_hori}></View>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/userinfo_sex.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        {/* <TextInput placeholder='请输入性别' placeholderTextColor='#dcdcdc' keyboardType='default' 
                    maxLength={2} onChangeText={(text) => {this.setState({sex:text})}} selectionColor='black'
                    defaultValue={this.state.sex} 
                    value={this.state.sex} underlineColorAndroid='transparent'
                    style={{width:'83%',height:50,marginLeft:'2%',marginTop:20}}/> */}
                        <Picker
                            selectedValue={this.state.sex}
                            style={{ height: 50, width: 100,marginLeft:'2%',marginTop:20 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ sex: itemValue })}>
                            <Picker.Item label="男" value="man" />
                            <Picker.Item label="女" value="woman" />
                            <Picker.Item label="保密" value="secret" />
                        </Picker>
                        {/* <TouchableOpacity onPress={() => this.setState({ sex: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={style.separator_hori}></View>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/phone.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        <TextInput placeholder='请输入手机号' placeholderTextColor='#dcdcdc' keyboardType='numeric'
                            maxLength={11} onChangeText={(text) => { this.setState({ phone: text }) }} selectionColor='black'
                            defaultValue={this.state.phone}
                            value={this.state.phone} underlineColorAndroid='transparent'
                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.setState({ phone: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.separator_hori}></View>
                    <View style={{ flexDirection: 'row', width: '96%', marginLeft: '2%' }}>
                        <Image source={require('../../../assets/userinfo_address.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
                        <TextInput placeholder='请输入地址' placeholderTextColor='#dcdcdc' keyboardType='default'
                            maxLength={30} onChangeText={(text) => { this.setState({ address: text }) }} selectionColor='black'
                            defaultValue={this.state.address}
                            value={this.state.address} underlineColorAndroid='transparent'
                            style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.setState({ address: '' })}>
                            <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.separator_hori}></View>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.userRegister()}>
                    <View style={style.foodorder}>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>注册</Text>
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
