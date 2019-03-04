import Http from'./Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class RestaurantApi {
    GetAllRestaurant(params: Request.GetAllRestaurant) {
        return Http.post<Response.GetAllRestaurant, Request.GetAllRestaurant>({
            url: '/api/GetAllRestaurant',
            data: params
        })
    }

    GetRestaurantInfo(params: Request.GetRestaurantInfo) {
        return Http.post<Response.GetRestaurantInfo, Request.GetRestaurantInfo>({
            url: '/api/GetRestaurantInfo',
            data: params
        })
    }

    UserCollectRestaurant(params:Request.UserCollectRestaurant){
        return Http.post<Response.Base,Request.UserCollectRestaurant>({
            url:'/api/UserCollectRestaurant',
            data:params
        })
    }
}

export default new RestaurantApi()