import Toast from 'react-native-simple-toast';
import State from './State';
class Http {
    get host() {
        return State.getItem('host') || '';
    }
    get token() {
        return State.getItem('token') || '';
    }
    request(option) {
        return new Promise((resolve, reject) => {
            let url = this.host + option.url;
            if (/^(http|https):\/\//.test(option.url) === true) {
                url = option.url;
            }
            option.data = option.data || {};
            let withToken = option.withToken === false ? false : true;
            if (withToken === true) {
                option.data.token = this.token;
            }
            let method = option.method || 'GET';
            let data = '';
            if (method === 'POST' && option.data) {
                data = JSON.stringify(option.data);
            }
            if (method === 'GET' && option.data) {
                let arr = [];
                for (let key in option.data) {
                    arr.push(`${key}=${option.data[key]}`);
                }
                let query = arr.join('&');
                if (query) {
                    url = `${url}?${query}`;
                }
            }
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": 'text/json,charset=utf-8'
                },
                body: method === 'POST' ? JSON.stringify(option.data || {}) : null
            })
                .then(response => response.json())
                .then(data => {
                resolve(data);
            })
                .catch(error => {
                Toast.show('网络不给力');
                reject(error);
            });
        });
    }
    get(option) {
        return this.request({
            ...option,
            method: 'GET'
        });
    }
    post(option) {
        return this.request({
            ...option,
            method: 'POST'
        });
    }
    formatUrl(option) {
        let url = this.host + option.url;
        if (/^(http|https):\/\//.test(option.url) === true) {
            url = option.url;
        }
        let data = option.data || {};
        if (option.withToken !== false) {
            data.token = this.token;
        }
        let arr = [];
        for (let key in option.data) {
            arr.push(`${key}=${option.data[key]}`);
        }
        let query = arr.join('&');
        url = `${url}?${query}`;
        return url;
    }
}
export default new Http();
