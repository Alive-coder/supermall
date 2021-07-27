import axios from 'axios'

export function request(config){
    // 实例化 axios 
    const instance = axios.create({
        // 在这里定义公共的属性
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // 请求拦截器
    instance.interceptors.request.use(config => {
        // 在请求发送之前可以对请求进行拦截进行处理，这里拦截的参数是请求的config
         // 进行操作，操作完成之后要将 config 参数进行返回
        return config
    },err => {
        // 请求失败会来到这里，打印错误信息
        console.log(err)
    })
    
    // 创建 axios 对象, 返回的就是 Promise 对象
    return instance(config)
}
