import Http from './Http';
class OrderApi {
    UserCreateOrder(params) {
        return Http.post({
            url: '/api/UserCreateOrder',
            data: params
        });
    }
}
export default new OrderApi();
