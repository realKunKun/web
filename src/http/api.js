// src/http/api.js
import Service from './axios.js'

// LogIn
export const login = data => {
    return Service({
        url: '/api/authorizations',
        method: 'post',
        data
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
};

// USER INFO
export const userApi = data => {
    return Service({
        url: '/api/user' + data,
        method: 'get',
    })
}