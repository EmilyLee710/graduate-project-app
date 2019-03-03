import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import State from '../../services/State'

import LoginService from '../../services/Login'
import CheckService from '../../services/checked'
// import common from '../Common/common'

interface State {
  phone: string,
  passwd: string,
  token: string,
  userId: 0
}

export default class Login extends React.Component<NavigationScreenProps, State>{

  state: State = {
    phone: '',
    passwd: '',
    token: '',
    userId: 0
  }

  // checkLogin(phone,code){
  //     if(this.state.phone === '18888888888' && this.state.passwd === '1234'){
  //         Toast.show('登录成功')
  //         this.props.navigation.pop()
  //     } else if(!this.state.phone){
  //       Toast.show('请输入手机号') 
  //     } else if(!this.state.passwd){
  //       Toast.show('请输入验证码')
  //     } else {
  //         Toast.show('请输入手机及验证码')
  //     }
  // }

  async checkLogin(phone, passwd) {
    if (!phone) {
      // alert('请输入手机号！')
      Toast.show('请输入手机号')
    } else if (!passwd) {
      // alert('请输入验证码！')
      Toast.show('请输入密码')
    } else {
      // Toast.show(passwd)
      try{
         let result = await LoginService.userLogin({
           phone:phone,
           passwd:passwd
         })
         
         if(result.stat === '1'){
          //  Toast.show(result.UserId)
           let id = result.UserId
           State.setItem('userId',id)
          //  Toast.show(JSON.stringify(State.getItem('userId')))
           this.props.navigation.navigate('Mine',{
            //  id:id
           })
         } else{
           Toast.show(CheckService.checkLoginStat(result.stat))
          // Toast.show(result.stat)
         }
      } catch(error) {
        Toast.show(error)
     }
    }
  }

  // async checkLogin(phone,code){
  //     if(!phone){
  //         // alert('请输入手机号！')
  //         Toast.show('请输入手机号')  
  //     } else if(!code){
  //         // alert('请输入验证码！')
  //         Toast.show('请输入验证码')
  //     } else {
  //         await fetch('http://console.dimanche.net.cn/api/user/PhoneLogin',{
  //           method:'POST',
  //           headers:{},
  //           body:JSON.stringify({
  //             'phone':phone,
  //             "code":code
  //         })
  //         }).then((response) => {
  //           if(response.ok){
  //               return response.json();
  //           }
  //         }).then((json) => {
  //         //   alert('登录成功');
  //           Toast.show('登录成功')
  //           this.props.navigation.navigate('MineHome',{
  //             token:json.token
  //           })
  //         //   global.isLogin = true;
  //         //   global.token = json.token;
  //             // this.setState({
  //             //     token:json.token,
  //             // })
  //         }).catch((error)=>{
  //           console.error(error);
  //         //   alert(error)
  //         })
  //     }

  // }


  render() {
    return (
      <View style={{ backgroundColor: 'white', height: 700 }}>
        <View style={{ marginTop: 30, marginLeft: '2%' }}>
          <Text style={{ fontSize: 16, color: '#d81e06' }}>Welcome</Text>
          <Text style={{ color: 'black' }}>请登录</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Register', {

        })}>
          <Text>还没有账号？点击注册</Text>
        </TouchableOpacity>
        <View style={{ width: '100%', height: 2, backgroundColor: '#d81e06', marginTop: 30 }}></View>
        <View style={{ marginBottom: 50 }}>
          {/* <Text>输入手机号</Text> */}
          <View style={{ flexDirection: 'row', marginTop: 50, width: '96%', marginLeft: '2%' }}>
            <Image source={require('../../../assets/phone.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
            <TextInput placeholder='输入手机号' placeholderTextColor='#dcdcdc' keyboardType='numeric'
              maxLength={11} onChangeText={(text) => { this.setState({ phone: text }) }} selectionColor='black'
              value={this.state.phone} underlineColorAndroid='transparent'
              style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20, paddingBottom: 10 }} />
            <TouchableOpacity onPress={() => this.setState({ phone: '' })}>
              <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={style.separator_hori}></View>
          <View style={{ flexDirection: 'row', marginTop: 20, width: '96%', marginLeft: '2%' }}>
            <Image source={require('../../../assets/passwd.png')} style={{ width: 25, height: 25, marginTop: 30 }} />
            <TextInput placeholder='输入密码' placeholderTextColor='#dcdcdc' keyboardType='default'
              maxLength={16} onChangeText={(text) => { this.setState({ passwd: text }) }} selectionColor='black'
              style={{ width: '83%', height: 50, marginLeft: '2%', marginTop: 20, paddingBottom: 10 }}
              value={this.state.passwd} underlineColorAndroid='transparent' />
            <TouchableOpacity onPress={() => this.setState({ passwd: '' })}>
              <EvilIcons name='close' color='#dcdcdc' size={25} style={{ marginTop: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={style.separator_hori}></View>
          {/* <View style={{flexDirection:'row'}}>
                      <View style={{width:'20%',height:20}}></View>
                      <View style={{flexDirection:'row'}}>
                          <Image source={require('../img/wd_dl_qd_2x.png')} style={{width:15,height:15}}/>
                          <Text>我同意并理解<Text style={{color:'#EB6100'}}>《竞拍协议》</Text>和<Text style={{color:'#EB6100'}}>《竞拍规则》</Text></Text>
                      </View>
                  </View> */}
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.checkLogin(this.state.phone, this.state.passwd)}>
          <View style={style.foodorder}>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 14 }}>登录</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title='登录' color='#d81e06' 
                onPress={()=> this.checkLogin(this.state.phone,this.state.passwd)}/> */}
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
  },
})