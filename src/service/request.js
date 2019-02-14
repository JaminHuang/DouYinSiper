/**
 * 创建时间：2016年11月14日 16:06:01
 * 创建人：JaminHuang
 * 描述：请求文件
 */
'use strict';
import fetch from 'isomorphic-fetch';

export function FetchPost(url, data) {
    return fetch(`${Config.URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response=> {
        return response.json();
    })
}

export function FetchGet(url) {
    return fetch(`${Config.URL}/${url}`, {
        method: 'GET'
    }).then(response=> {
        return response.json();
    })
}