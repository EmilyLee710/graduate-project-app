import { ColorPropType } from "react-native";
import { TabNavigator } from "react-navigation";

export interface AuctionMarketList{
  id:number,
  cover:string,
  name:string,
  start_time:number,
  expires_time:number,
  ctime:number,
  rule:string,
  interval:string,
  market_status:string,
  auction_items:Auction[],
  user_number:number,
  duration_time:number,
  duration_time_type:string,
  now_time:number,
  isFavorites:boolean,
  bid_count:number,
  done_number:number,
  done_price:number,
  view_count:number,
  serial_number:string
  
}

export interface Auction{
  id:number,
  cover:string,
  cover_images:string[],
  starting_price:number,
  reserve_price:number,
  scale:number,
  certified:string[],
  tag:string,
  customer_attrs:string[],
  details:string,
  user_number:number,
  realUser_numbe:number,
  hammer_price:number,
  start_time:number,
  expires_time:number,
  ctime:number,
  level:number,
  auction_status:number,
  deposit_price:number,
  refer_sku:SkuInfo,
  number:number,
  serial_number:string,
  reference_price:String,
  internal_number:string,
  current_price:number,
  bid_count:number,
  duration_time:number,
  duration_time_type:string,
  now_time:number,
  isBid:boolean,
  hasRightBid:boolean,
  isFavorites:boolean
}

export interface SkuInfo{
  id:number,
  name:string,
  seller:string,
  author:string,
  number:number,
  ctime:number,
  sku_status:number
}

export interface foodInfo{
  id:number,
  c_name:string,
  price:number,
  cover_url:string,
  detail_url:string,
  origin_price:number,
  sell_num:number,
  collect_num:number,
  restau_id:number,
  restau_name:string,
  ctime:number,
  tag:string
}

export interface RestauInfo{
  id:number,
  restauname:string,
  address:string,
  phone:string,
  cuisinelist:RestauCuiItem[]
  ctime:number,
  collect_num:number
  description:string
  license:string,
  cover_url:string,
  sale_info:string
}

export interface RestauCuiItem{
  id:number,
  c_name:string,
  price:number,
  cover_url:string,
  origin_price:number,
  ctime:number,
  tag:string
}

export interface FoodlistItem{
  id:number,
  c_name:string,
  tag:string,
  price:number,
  cover_url:string,
  origin_price:number,
  restau_name:string,
  ctime:number
}

export interface UserInfo{
  id:number,
  username:string,
  phone:string,
  address:string,
  sex:number,
  ctime:number
}

export interface ResListItem{
  id:number,
  cover_url:string
  restaurantname:string,
  address:string,
}

export interface CartCuisineItem{
  id:number,
  c_name:string,
  price:number,
  cover_url:string,
  num:string
}

export interface CartInfo{
  id:number,
  userId:number,
  restauinfo:{
    id:number,
    restaurantname:string,
  },
  cuisinelist:CartCuisineItem[]
}

export interface OrderCuiItem{
  id:number,
  num:number
}

export interface MyOrder{
   id:number,
   ctime:number,
   comment:string,
   tot_price:number,
   cuisine_id:{
     id:number,
     name:string,
     num:number,
     cover_url:string
   }[],
   restau_id:number,
   restau_name:string,
   order_staus:number
}

export interface HomeImages{
    id:number,
    url:string,
    index:number
}