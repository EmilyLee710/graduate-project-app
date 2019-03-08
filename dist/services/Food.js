import Http from './Http';
class FoodApi {
    GetAllCuisine(params) {
        return Http.post({
            url: '/api/GetAllCuisine',
            data: params
        });
    }
    GetCuisineInfo(params) {
        return Http.post({
            url: '/api/GetCuisineInfo',
            data: params
        });
    }
    UserCollectCuisine(params) {
        return Http.post({
            url: '/api/UserCollectCuisine',
            data: params
        });
    }
    GetHomeSwipers() {
        return Http.post({
            url: '/api/GetHomeSwipers',
        });
    }
}
export default new FoodApi();
