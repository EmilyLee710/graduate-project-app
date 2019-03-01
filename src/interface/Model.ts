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
  restau_name:string,
  ctime:number,
  tag:string
}

export interface RestauInfo{
  id:number,
  ctime:number,
  name:string,
  passwd:string,
  phone:string,
  address:string,
  license:string,
  cover_url:string
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