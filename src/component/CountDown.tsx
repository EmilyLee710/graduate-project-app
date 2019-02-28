import * as React from 'react';
import { Text, View,StyleSheet,Image,ScrollView,FlatList,Modal,TouchableHighlight,Button,ImageBackground,SectionList,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'

interface Props{
    time:number,
    color:string,
    flag:string,
    margin:number
}

interface State{
    time:number,
    color:string,
    flag:string,
    margin:number,  
}

let timeId = 0

export default class CountDown extends React.Component<Props,State>{

    state:State = {
        time:this.props.time,
        color:this.props.color,
        flag:this.props.flag,
        margin:this.props.margin,
    }

    cut(){
        this.setState({
          time: this.state.time-1000
        });
        // alert(this.state.time)
    }
      
      componentDidMount(){
        timeId = setInterval(()=>
           this.cut()
          ,1000);
        
        // alert(this.state.time)
      }
  
      componentWillUnmount() {
        clearInterval(timeId);
      }

      componentWillReceiveProps(nextProps){
          this.setState({
              time:nextProps.time   //初始props传入值为0，需要获取下一props值，即父组件state更新后的传入的值才是需要渲染的值
          })
      }

      render(){
          return(
              <View>
                  {Math.floor(this.state.time/(24*3600*1000)) > 0 ?<View style={[style.bidtime,{marginTop:this.state.margin}]}>
                    <Text style={{color:'black',marginLeft:10}}>{this.state.flag}</Text>
                    <Text style={{color:this.state.color}}>{Math.floor(this.state.time/(24*3600*1000))}</Text>
                    <Text style={{color:'black'}}>天</Text>
                    <Text style={{color:this.state.color}}>{Math.floor((this.state.time%(24*3600*1000))/(3600*1000))}</Text>
                    <Text style={{color:'black'}}>时</Text>
                    <Text style={{color:this.state.color}}>{Math.floor(((this.state.time%(24*3600*1000))%(3600*1000))/(60*1000))}</Text>
                    <Text style={{color:'black'}}>分</Text>
                </View> : <View style={[style.bidtime,{marginTop:this.state.margin}]}>
                    <Text style={{color:'black',marginLeft:10}}>{this.state.flag}</Text>
                    <Text style={{color:this.state.color}}>{Math.floor(this.state.time/(3600*1000))}</Text>
                    <Text style={{color:'black'}}>时</Text>
                    <Text style={{color:this.state.color}}>{Math.floor((this.state.time%(3600*1000))/(60*1000))}</Text>
                    <Text style={{color:'black'}}>分</Text>
                    <Text style={{color:this.state.color}}>{Math.floor(((this.state.time%(3600*1000))%(60*1000))/1000)}</Text>
                    <Text style={{color:'black'}}>秒</Text>
                </View>}
              </View>  
          )
      }

}

let style = StyleSheet.create({
    bidtime:{
        height:20,
        width:160,
        backgroundColor:'white',
        opacity:0.8,
        flexDirection:'row'
      }
})