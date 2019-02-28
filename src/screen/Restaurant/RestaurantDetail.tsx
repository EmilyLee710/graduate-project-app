import * as React from 'react';
import * as model from '../../interface/Model'
import { Text, View,StyleSheet,Image,ScrollView,FlatList,Modal,TouchableHighlight,TouchableOpacity,Button,ImageBackground,SectionList } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import BidService from '../../services/Bid'
import style from '../../styles/RestaurantDetail'
import State from '../../services/State';


interface Params{
    id:number
}

interface State{
    id:number,
    auctionMarket:model.AuctionMarketList,
    auctionList:model.Auction[],
    duration_time:number,
    isLoading:boolean
}

export default class RestaurantDetail extends React.Component<NavigationScreenProps<Params>,State>{
    state : State = {
        id:0,
        auctionMarket:{
          id:0,
          cover:'',
          name:'',
          start_time:0,
          expires_time:0,
          ctime:0,
          rule:'',
          interval:'',
          market_status:'',
          auction_items:[],
          user_number:0,
          duration_time:0,
          duration_time_type:'',
          now_time:0,
          isFavorites:false,
          bid_count:0,
          done_number:0,
          done_price:0,
          view_count:0,
          serial_number:''
        },
        auctionList:[],
        duration_time:0,
        isLoading:true
    }

    _foodItem = (info)=>{
        // let id = "1";
        // let name = "hh";
        // // let cover = "info.item.cover";
        // let starting_price = "";
        // // let formatPrice = this.formatPrice(starting_price);
        // let reference_price = info.item.reference_price;
        // let duration_time = info.item.duration_time;
        // let color;
        // let flag;
        // let tag;
        // let status;
        // let formatTime;
        // let exactTime;
        

        return (
            <TouchableHighlight onPress={()=>this.props.navigation.push('FoodDetail',{id:'1'})}>
                <View style={{flexDirection:'row',backgroundColor:'white',height:150,width:'100%'}}>
                    <ImageBackground style={style.foodlistimg} source={require('../../../assets/food_cover.jpg')}/>
                    <View style={{marginTop:0,marginLeft:10,width:'65%'}}>
                      <Text style={{fontSize:18,marginTop:0,color:'#d81e06'}}>麻婆豆腐</Text>
                      {/* <Text style={{fontSize:16}}>川胖子</Text> */}
                      <Text style={{fontSize:18,color:'#d81e06',marginTop:0}}>￥20</Text>  
                    </View>
                </View>
            </TouchableHighlight>
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

      async getAuctionList(sort,order){
        try{
          const id = this.props.navigation.state.params.id;
          let result = await BidService.auctionList({
            marketId:id,
            token:null,
            pageIndex:0,
            pageSize:100,
            sort:sort,
            order:order
          })
          if(result.stat !== 'ok'){
            Toast.show(result.stat)
          }
          this.setState({
            auctionList:result.items,
            isLoading:false
          })
        } catch(error) {
          Toast.show(error)
        }
      }
    async getAuctionMarket(){
      try{
        const id = this.props.navigation.state.params.id;
        let result = await BidService.auctionMarket({
          marketId:id,
          token:null
        })
        if(result.stat !== 'ok'){
          Toast.show(result.stat)
        }
        this.setState({
          id:result.item.id,
          auctionMarket:result.item,
          duration_time:result.item.duration_time
        })
      } catch (error) {
        Toast.show(error)
      }
    }

    componentWillMount(){
      // console.log('______________________________')
      // this.getAuctionMarket();
      // this.getAuctionList('ctime','desc');
      // State.setItem('showTab',false)
    }

    render(){         
        return (
          <View>
            {/* <Text>拍品详情</Text> */}
            {/* 会首先传入InitialState*/}
            <ScrollView>
                <View style={{backgroundColor:'white'}}>                  
                  <ImageBackground style={style.restaurantimg} source={require('../../../assets/restaurant_cover.jpg')}>
                   </ImageBackground>
                    <View style={{width:'88%',marginLeft:'6%',marginTop:9}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                        <Text style={{fontSize:18,color:'#d81e06'}}>川胖子</Text>
                      </View>
                      <Text style={{fontSize:16,color:'black'}}>华中师范大学南门</Text>
                      <Text style={{fontSize:12,color:'black'}}>电话：027-88888888</Text>
                    </View> 
                   <View style={style.restaurantdetail}>
                       <Text style={{marginTop:9}}>收藏：520</Text>
                       <Text style={{marginTop:9}}>销量：888</Text>
                       <Text style={{marginTop:9}}>浏览：1314</Text>
                   </View>
                   {/* <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                     <TouchableOpacity activeOpacity={0.5}>
                       <View 
                       style={{width:50,height:25,backgroundColor:'#d81e06'}}>
                         <Text style={{color:'white',fontSize:28,textAlign:'center'}}>收藏</Text>
                       </View>
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={0.5}>
                       <View 
                       style={{width:50,height:25,backgroundColor:'#343C47'}}>
                         <Text style={{color:'white',fontSize:28,textAlign:'center'}}>投诉</Text>
                       </View>
                     </TouchableOpacity>
                   </View> */}
                {this.state.auctionList === null ?<View>
                  <Text style={{textAlign:'center'}}>暂无菜品</Text>
                </View> :<FlatList 
                  data={this.state.auctionList} 
                  renderItem = {this._foodItem}
                  initialNumToRender={2}
                  keyExtractor= {(item,index) => index.toString()}
                  refreshing={this.state.isLoading}
                /> }
                <Text style={{marginTop:20,textAlign:'center'}}>—————————— 没有更多啦 ——————————</Text>
              </View> 
            </ScrollView>
          </View>
        )
    }
}



