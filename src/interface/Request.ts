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