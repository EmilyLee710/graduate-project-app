import * as React from 'react'
import { Text, View,StyleSheet,Image,ScrollView,FlatList,TouchableHighlight,Button,ImageBackground,SectionList,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper'
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import * as model from '../../interface/Model'
import style from '../../styles/FoodList'

import BidService from '../../services/Bid'
import FoodService from '../../services/Food'

import CountDown from '../../component/CountDown'
import State from '../../services/State';

interface State{
    foodList:model.FoodlistItem[],
    isLoading:boolean
}

export default class FoodList extends React.Component<NavigationScreenProps,State> {
  
    state: State = {
      foodList:[],
      isLoading:true
    }

    _foodItem = (info) =>{
      let id = info.item.id;
      let cover = info.item.cover;
      // let duration_time_type = info.item.duration_time_type;
      let name = info.item.c_name;
      let res_name = info.item.restau_name
      let price = info.item.price;
      let origin_price = info.item.origin_price;
      let pub_time = this.timestampToDate(info.item.ctime)
      // let user_number = info.item.user_number;
      // let view_count = info.item.view_count;
      // let duration_time	 = info.item.duration_time;
      // let color;
      // let status;
      // let flag;
      let tag = info.item.tag;
      // let timeToDate;
      // let formatTime;
      // if(info.item.duration_time_type === 'Now'){
      //   color = '#EB6100';
      //   status= '拍卖中'
      //   flag = '距离结束';
      //   tag = '结束';
      //   let expires_time = info.item.expires_time;
      //   timeToDate = this.timestampToDate(expires_time);
      //   // formatTime = this.getFormatTime(expires_time)
      // } else if(info.item.duration_time_type === 'Future'){
      //   color = '#5EBAA9';
      //   status = '预展中'
      //   flag = '距离开始';
      //   tag = "开始"
      //   let start_time = info.item.start_time;
      //   timeToDate = this.timestampToDate(start_time);
      //   // formatTime = this.getFormatTime(start_time)
      // } else if(info.item.duration_time_type === 'Expires'){
      //   color = '#808080';
      //   status = '已结束'
      //   flag = '结束时间';
      //   tag = '结束';
      //   let expires_time = info.item.expires_time;
      //   timeToDate = this.timestampToDate(expires_time);

      // }

      return (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('FoodDetail',{
                  id:id
              })}>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          
             <View>           
                <View>
                  <ImageBackground style={style.foodimg} source={require('../../../assets/foog_recommend.jpg')}>
                    <View style={style.fooding}>
                      <Text style={{color:'white',textAlign:'center'}}>{tag}</Text>
                    </View>
                   </ImageBackground>
                </View>
              </View>
              <View>
                <View style={{marginLeft:10}}>
                  <Text style={style.foodtitle}>{name}</Text>
                  <Text style={{fontSize:16}}>{res_name}</Text>
                  <Text style={{color:'black'}}>￥{origin_price}</Text>
                  <Text style={[style.foodtitle,{marginTop:0}]}>￥{price}</Text>
                  <Text style={{marginTop:60}}>{pub_time}发布</Text>
                  {/* <Text style={{marginTop:0}}>520人浏览</Text> */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{width:'100%',height:1,backgroundColor:'#dcdcdc'}}></View>
        </View>
      )
    }

    timestampToDate(timestamp) {
      var date = new Date(timestamp),
      Y = date.getFullYear(),
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
      hour = (date.getHours() <10 ? '0' + (date.getHours()) :date.getHours()),
      minute = (date.getMinutes() <10 ? '0' + (date.getMinutes()) :date.getMinutes()),
      second = (date.getSeconds() <10 ? '0' + (date.getSeconds()) :date.getSeconds())
      // alert(Y+M+D);
      return (`${Y}-${M}-${D} ${hour}:${minute}`)
    }

    async getfoodList(method?:string,way?:string){
      try{
        let result = await FoodService.GetAllCuisine({
          method,
          way
        })
        if(result.stat !== '1') {
          Toast.show(result.stat.toString())
        }
        Toast.show('数据加载成功')
        let foodList = result.cuisine.map((item,i)=>{
          return item
        })
        this.setState({
          foodList:foodList,
          isLoading:false
        })
      } catch(error) {
         Toast.show(error)
      }
    }

    componentWillMount(){
      // console.log('______________________________')
      // this.getAuctionMarketList();
    }



    render() {
      return (
        <View style={{backgroundColor:'white'}} > 
           <ScrollView style={{marginBottom:3}}>
              {/* <SectionList 
                  initialNumToRender={4}
                  renderItem={this._bidItem.bind(this)}
                  sections={this.state.auctionMarketList}
                  keyExtractor= {(item,index) => index}
                  onRefresh={this.getAuctionMarketList}
                  refreshing={this.state.isLoading}
                  SectionSeparatorComponent={() => <View style={{height:5,backgroundColor:'#dcdcdc'}}></View>}
                /> */}
                <Swiper autoplay = {true} height={250} showsPagination = {true}
                   dotColor="white" activeDotColor='#d81e06' horizontal={true} loop={true}
                >
                  <Image source={require('../../../assets/swiper_1.jpg')} style={{width:'100%',height:250}}></Image>
                  <Image source={require('../../../assets/swiper_2.jpg')} style={{width:'100%',height:250}}></Image>
                  <Image source={require('../../../assets/swiper_3.jpg')} style={{width:'100%',height:250}}></Image>
                </Swiper>
                <View style = {{flexDirection:'row',justifyContent:'space-between',width:'96%',marginLeft:'2%'}}>
                   <TouchableHighlight>
                     <Text style={{color:'#d81e06',fontSize:16}}>按销量从高到低</Text>
                   </TouchableHighlight>
                   <TouchableHighlight>
                     <Text style={{color:'#d81e06',fontSize:16}}>按收藏从高到低</Text>
                   </TouchableHighlight>
                </View>
                {this.state.foodList === null? <View>
                  <Text style={{textAlign:'center'}}>暂无食品推荐</Text>
                </View>:<FlatList 
                  data={this.state.foodList} 
                  renderItem = {this._foodItem}
                  keyExtractor= {(item,index) => index.toString()}
                  initialNumToRender={2}
                  onRefresh={this.getfoodList}
                  refreshing={this.state.isLoading}
                />}

                <Text style={{marginTop:20,textAlign:'center'}}>—————————— 没有更多啦 ——————————</Text> 
        </ScrollView> 
        
      </View>
      )
   }
}

// let style = StyleSheet.create({
//     bidimg:{
//         width: '100%',
//         height: 210,
//         marginTop:10,
//         backgroundColor: 'transparent',
//         flexDirection:'row',
//         justifyContent:'flex-start'
//     },
//     bidtitle:{
//         fontSize:16,
//         marginTop:10,
//         marginLeft:10,
//         color:'black' 
//     },
//     biding:{
//       height:20,
//       width:50,
//       backgroundColor:'#EB6100',
//       marginTop:160
//     },
//     bidtime:{
//       height:20,
//       width:160,
//       backgroundColor:'white',
//       marginTop:160,
//       opacity:0.8,
//       flexDirection:'row'
//     }
// })