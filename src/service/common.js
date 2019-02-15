'use strict';
import md5 from '../static/js/md5.min';

/*生成签名串*/
export function getSign(params) {
    if (typeof params === "string") {
        return paramsStrSort(params);
    } else if (typeof params === "object") {
        let arr = [];
        for (let i in params) {
            arr.push((i + "=" + params[i]));
        }
        return paramsStrSort(arr.join(("&")));
    }
}

/*获取随机字符串*/
export function randomString(len) {
    len = len || 32;
    let $chars = 'zyxwvutsrqponmlkjihgfedcba';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/*时间戳转化时间字符串*/
export function getTime(timestamp) {
    let d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    return (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
}

/*字符串排序md5*/
function paramsStrSort(paramsStr) {
    let strSort = paramsStr.split("&").sort().join("&");
    return md5(strSort);
}
