import Http from'./Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class CustomerApi{

    customerAvatar(){
        return Http.get<Response.CustomerAvatar>({
            url:'/api/user/UserGetCustomerAvatar'
        })
    }

    customerQrcode(){
        return Http.get<Response.CustomerQrcode>({
            url:'/api/user/UserGetCustomerQrcode'
        })
    }
}

export default new CustomerApi()