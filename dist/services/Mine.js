import Http from './Http';
class MineApi {
    getUserInfo(params) {
        return Http.post({
            url: '/api/GetUserInfo',
            data: params
        });
    }
    GetCollect(params) {
        return Http.post({
            url: '/api/GetCollect',
            data: params
        });
    }
    UserConfirmPwd(params) {
        return Http.post({
            url: '/api/UserConfirmPwd',
            data: params
        });
    }
    UserSetMyPwd(params) {
        return Http.post({
            url: '/api/UserSetMyInfo',
            data: params
        });
    }
    UserSetMyInfo(params) {
        return Http.post({
            url: '/api/UserSetMyInfo',
            data: params
        });
    }
    UserGetMyOrder(params) {
        return Http.post({
            url: '/api/UserGetMyOrder',
            data: params
        });
    }
}
export default new MineApi();
