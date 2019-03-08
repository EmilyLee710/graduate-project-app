import * as Model from './Model'

export interface Base {
    stat: string
}

export interface AuctionMarketList extends Base {
    items: Model.AuctionMarketList[],
    total: number
}

export interface AuctionMarket extends Base {
    item: Model.AuctionMarketList
}

export interface AuctionList extends Base {
    items: Model.Auction[],
    total: number
}

export interface AUction extends Base {
    item: Model.Auction
}

export interface CustomerAvatar extends Base {
    avatar: string
}

export interface CustomerQrcode extends Base {
    qrcode: string
}

export interface UserLogin extends Base {
    UserId: string
}

export interface GetAllCuisine extends Base {
    cuisine: Model.FoodlistItem[]
}

export interface GetCuisineInfo extends Base {
    cuisine: Model.foodInfo
}

export interface GetUserInfo extends Base {
    id: number,
    username: string,
    phone: string,
    address: string,
    sex: number,
    ctime: number
}

export interface GetAllRestaurant extends Base {
    restaurant: Model.ResListItem[]
}


export interface GetRestaurantInfo extends Base {
    restaurant:Model.RestauInfo
}

export interface GetCollect{
    restaurant:Model.ResListItem[],
    cuisine:Model.FoodlistItem[]
}

export interface UserCreateOrder{
   price:number
}

export interface UserGetMyOrder{
    order:Model.MyOrder[]
}

export interface GetHomeSwipers{
    swiper:Model.HomeImages[]
}
