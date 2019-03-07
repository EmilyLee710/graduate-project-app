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

    UserConfirmPwd(params: Request.UserConfirmPwd) {
        return Http.post<Response.Base, Request.UserConfirmPwd>({
            url: '/api/UserConfirmPwd',
            data: params
        })
    }

    UserSetMyPwd(params: Request.UserSetMyPwd) {
        return Http.post<Response.Base, Request.UserSetMyPwd>({
            url: '/api/UserSetMyInfo',
            data: params
        })
    }

    UserSetMyInfo(params: Request.UserSetMyInfo) {
        return Http.post<Response.Base, Request.UserSetMyInfo>({
            url: '/api/UserSetMyInfo',
            data: params
        })
    }

    UserGetMyOrder(params: Request.UserGetMyOrder) {
        return Http.post<Response.UserGetMyOrder, Request.UserGetMyOrder>({
            url: '/api/UserGetMyOrder',
            data: params
        })
    }
}

export default new MineApi()