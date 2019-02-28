import Http from './Http';
class BidApi {
    auctionMarketList(params) {
        return Http.post({
            url: '/api/market/ListOnlineAuctionMarket',
            data: params
        });
    }
    auctionMarket(params) {
        return Http.post({
            url: '/api/market/GetAuctionMarketInfo',
            data: params
        });
    }
    auctionList(params) {
        return Http.post({
            url: '/api/auction/ListAuctionByMarket',
            data: params
        });
    }
    auction(params) {
        return Http.post({
            url: '/api/auction/GetAuctionInfo',
            data: params
        });
    }
}
export default new BidApi();
