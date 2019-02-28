import * as React from 'react';
import * as model from '../../interface/Model'
import { Text, View,StyleSheet,Image,ScrollView,FlatList,Modal,TouchableHighlight,TouchableOpacity,Button,ImageBackground,SectionList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation'
import Toast from 'react-native-simple-toast'

import BidService from '../../services/Bid'
import CountDown from '../../component/CountDown'
import style from '../../styles/FoodDetail'
import State from '../../services/State';


interface Params{
    id:number,
    status?:string,
    color?:string,
    flag?:string,
}

interface State{
    id:number,
    auctionMarket:model.AuctionMarketList,
    auctionList:model.Auction[],
    duration_time:number,
    isLoading:boolean
}

export default class BidDetails extends React.Component<NavigationScreenProps<Params>,State>{
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

    // _lotItem = (info)=>{
    //     let id = "info.item.id";
    //     let name = "info.item.refer_sku.name";
    //     let cover = "info.item.cover";
    //     let starting_price = "";
    //     let formatPrice = this.formatPrice(starting_price);
    //     let reference_price = info.item.reference_price;
    //     let duration_time = info.item.duration_time;
    //     let color;
    //     let flag;
    //     let tag;
    //     let status;
    //     let formatTime;
    //     let exactTime;
        

    //     return (
    //         <TouchableHighlight onPress={()=>this.props.navigation.push('AuctionDetail')}>
    //             <View style={{flexDirection:'row',backgroundColor:'white',height:150,width:'100%'}}>
    //                 <Image style={style.lotimg} source={{uri:`${State.getItem('host')}${cover}`}}/>
    //                 <View style={{marginTop:10,marginLeft:10,width:'65%'}}>
    //                     <Text style={{color:'black',fontSize:16}}>hhh</Text>
    //                     <View style={[style.fooding,{backgroundColor:color,marginTop:0}]}>
    //                         <Text style={{color:'white',textAlign:'center'}}>{status}</Text>
    //                     </View>
    //                     <View style={{flexDirection:'row'}}>
    //                         <Text style={{color:color}}>起拍价：</Text>
    //                         <Text style={{color:color,fontSize:16}}>{formatPrice} CNY</Text>
    //                     </View>
    //                     <Text>市场参考价：{info.item.reference_price}</Text>
    //                     <Text>{flag}：{formatTime.year}年{formatTime.month}月{formatTime.day}日{formatTime.hour}时{formatTime.minute}分</Text>
    //                 </View>
    //             </View>
    //         </TouchableHighlight>)
    // }

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
            // Toast.show(result.stat)
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
          // Toast.show(result.stat)
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
        const status = this.props.navigation.state.params.status;
        const color = this.props.navigation.state.params.color;
        const flag = this.props.navigation.state.params.flag;
        let formatTime = this.timestampToDate(this.state.auctionMarket.expires_time);
        
        return (
          <View>
            {/* <Text>拍品详情</Text> */}
            <ScrollView>
                <View style={{backgroundColor:'white'}}>
                  <ImageBackground style={style.foodimg} source={require('../../../assets/foog_recommend.jpg')}>
                    <View style={[style.fooding]}>
                      <Text style={{color:'white',textAlign:'center'}}>川菜</Text>
                    </View>  
                    {/* 会首先传入InitialState*/} 
                   </ImageBackground>
                   <View style={{width:'88%',marginLeft:'6%',marginTop:9}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                        <Text style={{fontSize:18,color:'#d81e06'}}>麻婆豆腐</Text>
                        <Text style={{fontSize:18,color:'#d81e06'}}>￥20</Text>
                      </View>
                      <Text style={{fontSize:16,color:'black'}}>川胖子</Text>
                    </View> 
                   <View style={style.fooddetail}>
                       <Text style={{marginTop:9}}>收藏：520</Text>
                       <Text style={{marginTop:9}}>销量：888</Text>
                       <Text style={{marginTop:9}}>浏览：1314</Text>
                   </View>
                   {/* <TouchableOpacity activeOpacity={0.5}>
                     <View 
                     style={{flexDirection:'row',justifyContent:'flex-end',width:50,height:25,backgroundColor:'#d81e06'}}>
                       <Text style={{color:'white',fontSize:28,textAlign:'center'}}>收藏</Text>
                     </View>
                   </TouchableOpacity> */}
                   <View style={{marginTop:10,width:'88%',marginLeft:'6%'}}>
                     <Text>麻婆豆腐，是四川省传统名菜之一，属于川菜。主要原料为配料和豆腐，
                       材料主要有豆腐、牛肉末（也可以用猪肉）、辣椒和花椒等。麻来自花椒，
                       辣来自辣椒，这道菜突出了川菜“麻辣”的特点。其口味独特，口感顺滑。</Text>
                   </View>
                   <TouchableOpacity   onPress={() => this.props.navigation.push('Order')}>
                      <View style={style.foodorder}>
                        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:14}}>点我下单</Text>
                      </View>
                   </TouchableOpacity>
                </View>
                {/* <View style={style.listheader}>
                    <TouchableOpacity onPress={()=> this.getAuctionList('ctime','desc')}>
                      <Text style={{color:'black',marginLeft:25}}>默认</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.getAuctionList('starting_price','asc')}>
                      <Text style={{marginLeft:20}}>↓价格由低到高</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.getAuctionList('starting_price','desc')}>
                      <Text style={{marginLeft:20}}>↑价格由高到低</Text>
                    </TouchableOpacity>  
                </View> */}
                <Text style={{marginTop:20,textAlign:'center'}}>—————————— 没有更多啦 ——————————</Text> 
            </ScrollView>
          </View>
        )
    }
}

