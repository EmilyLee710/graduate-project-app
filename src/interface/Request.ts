import {OrderCuiItem} from './Model'

export interface AuctionMarketList {
  token?:string,
  type:string,
  pageIndex?:number,
  pageSize?:number,
  sort?:string,
  order?:string
}

export interface AuctionMarket{
  token?:string,
  marketId:number
}

export interface AuctionList{
  marketId:number,
  token?:string,
  pageIndex?:number,
  pageSize?:number,
  sort?:string,
  order?:string
}

export interface Auction{
  auctionId:number,
  token?:string
}

export interface UserRegister{
  username:string,
  phone:string,
  address:string,
  sex:number,
  passwd:string
}

export interface UserLogin{
  phone:string,
  passwd:string
}

export interface GetAllCuisine{
  method?:string,
  way?:string
}

export interface GetCuisineInfo{
  CuisineId:number
}

export interface GetUserInfo{
  userID:number
}

export interface GetAllRestaurant{
  method?:string,
  way?:string
}

export interface GetRestaurantInfo{
  RestaurantId:number
}

export interface GetCollect{
  UserId:number
}

export interface UserConfirmPwd{
  UserId:number,
  pwd:string
}

export interface UserSetMyPwd{
  UserId:number,
  pwd:string,
  username:string,
  address:string,
  phone:string,
  sex:number
}

export interface UserSetMyInfo{
  UserId:number,
  pwd:string,
  username:string,
  address:string,
  phone:string,
  sex:number
}

export interface UserCollectCuisine{
  cuisineID:number,
  UserId:number
}

export interface UserCollectRestaurant{
  restauID:number,
  UserId:number
}

export interface UserCreateOrder{
  buyer_id:number,
  cuisine_id:OrderCuiItem[],
  comment:string,
  restau_id:number,
  appoint_time:number
}

export interface UserGetMyOrder{
  UserId:number
}
