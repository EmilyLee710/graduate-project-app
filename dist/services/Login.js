import Http from './Http';
class LoginApi {
    userRegister(params) {
        return Http.post({
            url: '/UserRegister',
            data: params
        });
    }
    userLogin(params) {
        return Http.post({
            url: '/UserLogin',
            data: params
        });
    }
}
export default new LoginApi();
