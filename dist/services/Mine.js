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
}
export default new MineApi();
