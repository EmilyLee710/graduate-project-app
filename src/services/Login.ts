import Http from'./Http'
import * as Request from '../interface/Request'
import * as Response from '../interface/Response'

class LoginApi{
    userRegister(params:Request.UserRegister){
        return Http.post<Response.Base,Request.UserRegister>({
            url:'/api/UserRegister',
            data:params
        })
    }
    // userRegister(params:Request.UserRegister){
    //     return Http.post<Response.Base,Request.UserRegister>({
    //         url:'/api/user/register',
    //         data:params
    //     })
    // }
    userLogin(params:Request.UserLogin){
        return Http.post<Response.UserLogin,Request.UserLogin>({
            url:'/api/UserLogin',
            data:params
        })
    }
}

export default new LoginApi()