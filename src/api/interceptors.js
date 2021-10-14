// axios
import axios from 'axios';
// 路由
import router from '../router';
// loading
import { Loading, Message } from 'element-ui';

let loadingInit;

// 添加请求和响应拦截器
export default () => {
    // 配置请求
    // let cancelToken = axios.CancelToken;
    // let source = cancelToken.source();
    // 添加请求拦截器
    axios.interceptors.request.use((config) => {
        // Loading
        if (config.headers.needLoading) {
            loadingInit = Loading.service({
                lock: true,
                text: '加载中···',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        //所有的请求中配置的是同一个cancelToken，所以在之后的所有请求都会直接执行onCanceled方法        config.cancelToken = source.token;
        if (config.headers.file){
            config.headers["Content-type"] = "multipart/form-data";
        }else{
            config.headers["Content-type"] = "application/json";
        }
        // 添加token
        config.headers['X-Token'] = localStorage.getItem('token');
        return config
    }, (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    axios.interceptors.response.use(async (response) => {
        // 关闭loading
        loadingInit && loadingInit.close();
        // 统一处理非200的错误处理
        if (response.data.code && response.data.code !== 200) {
            Message.error({
                message: response.data.message,
                duration: 1000
            });
            // 对响应数据401做点什么
            if (response.data.code === 401) {
                // 取消所有请求
                //source.cancel();
                // 取消请求之后，重新配置source
                // cancelToken = axios.CancelToken;
                // source = cancelToken.source();
                await router.push({ path: '/login' });
            }
            return Promise.reject()
        }else{
            //请求成功才回调
            return response;
        }
    }, (error) => {
        if (error.response.data.code==401) {
            window.localStorage.removeItem('token')
            router.push({ path: '/login' });
        }
        // 关闭loading
        loadingInit && loadingInit.close();
        // 对响应错误做点什么
        return Promise.reject(error);
    });
};
