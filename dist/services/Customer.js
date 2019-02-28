import Http from './Http';
class CustomerApi {
    customerAvatar() {
        return Http.get({
            url: '/api/user/UserGetCustomerAvatar'
        });
    }
    customerQrcode() {
        return Http.get({
            url: '/api/user/UserGetCustomerQrcode'
        });
    }
}
export default new CustomerApi();
