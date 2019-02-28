import Http from'./Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class BidApi {

  auctionMarketList(params:Request.AuctionMarketList){
      return Http.post<Response.AuctionMarketList,Request.AuctionMarketList>({
          url:'/api/market/ListOnlineAuctionMarket',
          data:params
      })
  }

  auctionMarket(params:Request.AuctionMarket){
      return Http.post<Response.AuctionMarket,Request.AuctionMarket>({
          url:'/api/market/GetAuctionMarketInfo',
          data:params
      })
  }

  auctionList(params:Request.AuctionList){
      return Http.post<Response.AuctionList,Request.AuctionList>({
          url:'/api/auction/ListAuctionByMarket',
          data:params
      })
  }

  auction(params:Request.Auction){
      return    Http.post<Response.AUction,Request.Auction>({
          url:'/api/auction/GetAuctionInfo',
          data:params
      })
  }
}

export default new BidApi()