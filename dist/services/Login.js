import Http from './Http';
class LoginApi {
    userRegister(params) {
        return Http.post({
            url: '/api/UserRegister',
            data: params
        });
    }
    userLogin(params) {
        return Http.post({
            url: '/api/UserLogin',
            data: params
        });
    }
}
export default new LoginApi();
