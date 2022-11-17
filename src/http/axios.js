// src/http/axios.js
import axios from 'axios'
import { Modal, message } from 'ant-design-vue'
import router from '@/router'

axios.defaults.timeout = 10000 // 请求超时时间

const Service = axios.create({
    baseURL: '/',
})

// axios 请求拦截器
Service.interceptors.request.use(
    config=>{
        if(localStorage.getItem("access_token")){
            config.headers.Authorization = 'Bearer' + '  ' + localStorage.getItem('access_token');
        }
        return config
    },error=>{
        Modal.confirm({
            title: '提示',
            content: '请求超时!',
        });
        return Promise.reject(error)
    }
)

//有的一个页面请求几个接口，当token过期或者账号被迫下线，避免出现多个弹窗，自定义cont，判断cont==0时候弹窗一次，然后cont++
let cont = 0
// axios respone拦截器
Service.interceptors.response.use(
    res=>{
        if(res.status === 200){
            if(res.data.message && res.data.message.type === 'logout'){
                if(cont === 0){
                    Modal.info({
                        title: '信息',
                        content: "你的账号在别处登陆，请注意！",
                        onOk() {
                            cont = 0
                        }
                    })
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('expires_time');
                    if(router.history.current.path !== '/home'){
                        router.push('/home');
                    }
                }
                cont ++;
            }

            return res;
        }else if (res.status === 401){
            router.push('/home');
            return res;
        }else if (res.status === 201) {
            return res;
        }
        return res;
    },
    error=>{
        const responseCode = error.response.status;
        switch (responseCode) {
            case 400:
                message.error('请求错误(400)')
                break
            case 401:
                if(cont === 0) {
                    message.error('登录过期，请重新登录')
                }
                cont++
                llocalStorage.removeItem('access_token');
                localStorage.removeItem('expires_time');
                if(router.history.current.path !== '/home'){
                    router.push('/home');
                }
                break
            case 403:
                message.error('拒绝访问(403)')
                break
            case 404:
                message.error('请求出错(404)')
                break
            case 408:
                message.error('请求超时(408)')
                break
            case 500:
                message.error('服务器错误(500)')
                break
            case 501:
                message.error('服务未实现(501)')
                break
            case 502:
                message.error('网络错误(502)')
                break
            case 503:
                message.error('服务不可用(503)')
                break
            case 504:
                message.error('网络超时(504)')
                break
            case 505:
                message.error('HTTP版本不受支持(505)')
                break
            default:
                Modal.confirm({
                    title: '提示',
                    content: `连接出错(${error.response.status})！`,
                });
        }
        return Promise.reject(error.response.data)
    }
)

export default Service;