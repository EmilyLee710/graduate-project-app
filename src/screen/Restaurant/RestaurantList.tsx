import * as React from 'react'
import { Text, View,StyleSheet,Image,ScrollView,FlatList,TouchableHighlight,Button,ImageBackground,SectionList,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import * as model from '../../interface/Model'
import style from '../../styles/FoodList'

import BidService from '../../services/Bid'

import CountDown from '../../component/CountDown'
import State from '../../services/State';

interface State{
    auctionMarketList:model.AuctionMarketList[],
    isLoading:boolean
}

export default class RestaurantList extends React.Component<NavigationScreenProps,State> {
  
    state: State = {
      auctionMarketList:[],
      isLoading:true
    }

    _restaurantItem = (info) =>{
      // let id = info.item.id;
      // let cover = info.item.cover;
      // let duration_time_type = info.item.duration_time_type;
      // let name = info.item.name;
      // let user_number = info.item.user_number;
      // let view_count = info.item.view_count;
      // let duration_time	 = info.item.duration_time;
      // let color;
      // let status;
      // let flag;
      // let tag;
      // let timeToDate;
      // let formatTime;
      

      return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('RestaurantDetail',{id:'1'})}>
                <View>
                  <ImageBackground style={[style.foodimg,{width:'100%'}]} source={require('../../../assets/restaurant_cover.jpg')}>
                    {/* <View style={[style.biding,{backgroundColor:color}]}>
                      <Text style={{color:'white',textAlign:'center'}}>川菜</Text>
                    </View>
                    <View style={style.bidtime}>
                      麻婆豆腐
                    </View> */}
                   </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text style={style.foodtitle}>川胖子</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[style.foodtitle,{marginTop:0,color:'black'}]}>华中师范大学南门</Text>
                {/* <Text style={{marginRight:10}}>{view_count}人浏览</Text> */}
              </View>
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
      return ({year:Y,month:M,day:D,hour:hour,minute:minute,second:second})
    }
      
    async getAuctionMarketList(){
      try{
        let result = await BidService.auctionMarketList({
          token:null,
          type:"All",
          pageIndex:0,
          pageSize:100,
          sort:"ctime",
          order:"desc"
        })
        if(result.stat !== 'ok') {
          //  Toast.show(result.stat)
        }
        Toast.show('数据加载成功')
        let auctionMarkets = result.items.map((item,i)=>{
          return item
        })
        this.setState({
          auctionMarketList:auctionMarkets,
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
             
                {this.state.auctionMarketList === null? <View>
                  <Text style={{textAlign:'center'}}>暂无专场</Text>
                </View>:<FlatList 
                  data={this.state.auctionMarketList} 
                  renderItem = {this._restaurantItem}
                  keyExtractor= {(item,index) => index.toString()}
                  initialNumToRender={2}
                  onRefresh={this.getAuctionMarketList}
                  refreshing={this.state.isLoading}
                />}

                <Text style={{marginTop:20,textAlign:'center'}}>—————————— 没有更多啦 ——————————</Text> 
                {/* <Button title= '专场详情' onPress={() => this.props.navigation.push('BidDetail',{
                  id:37,
                  status:'结束',
                  color:'#808080',
                  flag:'结束',
                  duration_time:122222222
                })} /> */}
        </ScrollView> 
        
      </View>
      )
   }
}

