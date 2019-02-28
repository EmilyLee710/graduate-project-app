import * as React from 'react';
import { Text,TouchableOpacity, View,StyleSheet,Image,ScrollView,FlatList,Modal,TouchableHighlight,Button,Picker,ImageBackground,ToolbarAndroid } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { createStackNavigator } from 'react-navigation';
import Toast from 'react-native-simple-toast'

import CustomerService from '../services/Customer'
import style from '../styles/Qrcode'
import State from '../services/State';

interface Props{
    visible:boolean,
    onClose:Function
}

interface State{
    visible:boolean,
    qrcode:string
}

export default class MineHome extends React.Component<Props,State> {
//   constructor(props) {
//     super(props);
//     this.state = {visible: props.visible,qrcode:''};
//   }
 
  state:State={
      visible:this.props.visible,
      qrcode:''
  }

  onClose = ()=>{
      this.setState({
          visible:false
      })
//      this.state.visible = false;
    this.props.onClose();
  };

  // async getCustomerQrcode(){
  //   await fetch('http://console.dimanche.net.cn/api/user/UserGetCustomerQrcode',{
  //     method:'GET',
  //       headers:({
  //         'Content-Type': 'application/json'
  //      }),
  //     }).then((response)=>{
  //       if(response.ok){
  //         return response.json();
  //       }
  //     }).then((json)=>{
  //       // alert(JSON.stringify(json.qrcode));
  //       this.setState({
  //         qrcode:json.qrcode
  //       })
  //     }).catch((error)=>{
  //       console.error(error);
  //     })
  // }

  async getCustomerQrcode(){
    try{
      let result = await CustomerService.customerQrcode()
      if(result.stat !== 'ok'){
        // Toast.show(result.stat)
      }
      this.setState({
        qrcode:result.qrcode
      })
    } catch(error){
      Toast.show(error)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible
    });
  }

  componentWillMount(){
    this.getCustomerQrcode();
  }

  render() {
    return (
          <Modal animationType={'fade'}
            transparent={true}
            visible={this.state.visible}
            onRequestClose={this.onClose}
          >
            <View style={style.modalWrap}>
              <View style={style.modalStyle}>
                <View style={style.modalClose}>
                  <TouchableOpacity onPress={this.onClose}>
                    <Image source={require('../../assets/grzx_tc_gb.png')} />
                  </TouchableOpacity>
                </View>
                <View style={style.modalContent}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>ASSISTANCE</Text>
                  <Text style={{ fontSize: 12 }}>客户服务</Text>
                </View>
                <View style={style.modalContent}>
                  <View>
                    <Image source={{uri:`${State.getItem('host')}${this.state.qrcode}`}} style={{width:82,height:82}}/>
                  </View>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>您的专属客服</Text>
                </View>
                <View style={style.modalContent}>
                  <Text style={{ fontSize: 10 }}>长按识别二维码</Text>
                </View>
              </View>
            </View>
          </Modal>
          
    )
  }
}

