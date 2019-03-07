import Http from './Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class OrderApi{
    UserCreateOrder(params: Request.UserCreateOrder) {
        return Http.post<Response.UserCreateOrder, Request.UserCreateOrder>({
            url: '/api/UserCreateOrder',
            data: params
        })
    }
}

export default new OrderApi()