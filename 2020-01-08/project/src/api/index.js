import axios from 'axios';
const instance = axios.create();

//axios设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截
instance.interceptors.request.use(config => {
// Do something before request is sent
console.log('请求拦截');
const token = window.localStorage.getItem('token');
if(token) {
     //在发起请求的时候，把token带到服务器的头信息中
    config.headers['Authorization'] = token;
}
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(config => {
// Do something before response is sent
console.log('响应请求',config);
if(config.data.token) {
    //每次请求验证的时候都种上了最新的token值
    window.localStorage.setItem('token',config.data.token);
}
return config.data;
},error => {
// Do something with response error
return Promise.reject(error);
});

export {instance}