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