import Http from './Http';
class RestaurantApi {
    GetAllRestaurant(params) {
        return Http.post({
            url: '/api/GetAllRestaurant',
            data: params
        });
    }
    GetRestaurantInfo(params) {
        return Http.post({
            url: '/api/GetRestaurantInfo',
            data: params
        });
    }
}
export default new RestaurantApi();
