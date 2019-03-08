import Http from'./Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class FoodApi{
    GetAllCuisine(params:Request.GetAllCuisine){
        return Http.post<Response.GetAllCuisine,Request.GetAllCuisine>({
            url:'/api/GetAllCuisine',
            data:params
        })
    }

    GetCuisineInfo(params:Request.GetCuisineInfo){
        return Http.post<Response.GetCuisineInfo,Request.GetCuisineInfo>({
            url:'/api/GetCuisineInfo',
            data:params
        })
    }
    
    UserCollectCuisine(params:Request.UserCollectCuisine){
        return Http.post<Response.Base,Request.UserCollectCuisine>({
            url:'/api/UserCollectCuisine',
            data:params
        })
    }

    GetHomeSwipers(){
        return Http.post<Response.GetHomeSwipers>({
            url:'/api/GetHomeSwipers',
           
        })
    }

}

export default new FoodApi()