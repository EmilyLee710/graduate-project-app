import Http from './Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class MineApi {
    getUserInfo(params: Request.GetUserInfo) {
        return Http.post<Response.GetUserInfo, Request.GetUserInfo>({
            url: '/api/GetUserInfo',
            data: params
        })
    }

    GetCollect(params: Request.GetCollect) {
        return Http.post<Response.GetCollect, Request.GetCollect>({
            url: '/api/GetCollect',
            data: params
        })
    }
}

export default new MineApi()