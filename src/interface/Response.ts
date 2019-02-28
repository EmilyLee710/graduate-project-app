import * as Model from './Model'

export interface Base{
    stat:string
}

export interface AuctionMarketList extends Base{
    items:Model.AuctionMarketList[],
    total:number
}

export interface AuctionMarket extends Base{
    item:Model.AuctionMarketList
}

export interface AuctionList extends Base{
    items:Model.Auction[],
    total:number
}

export interface AUction extends Base{
    item:Model.Auction   
}

export interface CustomerAvatar extends Base{
    avatar:string
}

export interface CustomerQrcode extends Base{
    qrcode:string
}

export interface UserLogin extends Base{
    UserId:string
}

