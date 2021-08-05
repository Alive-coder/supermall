/*  防抖函数
参数： 传入需要进行防抖的函数 func, 以及需要延迟的时间 delay
在第一次执行时，timer 为 null 
如果在 定时器 时间内有接收到信息，就取消掉函数的执行，如果没有就执行
*/
export function debounce(func, delay){
    let timer = null
    return function(...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        func.apply(this, args)
    }, delay)
    }   
}


/*  将 date 对象转换成时间格式化
    第一个参数传递需要转换的date对象
    第二个参数传需要转换的格式 字符串 fmt (形如： yyyy-MM-dd mm-ss)(年-月-日 分-秒)
*/
export function formatDate(date, fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
// padLeftZero 函数将 数字转换成两位数
function padLeftZero(str){
    return ('00' + str).substr(str.length)
}