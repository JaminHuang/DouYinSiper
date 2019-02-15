/**
 * 创建时间：2016年11月14日 16:06:01
 * 创建人：JaminHuang
 * 描述：请求文件
 */
'use strict';
import fetch from 'isomorphic-fetch';
import { getSign, randomString } from '../service/common';

let PublicKey = "python";
let PrivateKey = "tRbij3ITQODfgpHrc90dQ+tUs62KRjJ4PSkmBQAKvnCSoFXnOlIz0A==";

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

export function Post(url, data) {
    let headers = {
        "publickey" : PublicKey,
        "nonce" : randomString(10),
        "timestamp" : new Date().getTime(),
        "privatekey" : PrivateKey
    };
    headers.signature = getSign(headers);
    return fetch(`${Config.BasicUrl}/${url}`, {
        headers: {"Content-Type": "application/json", "publickey" : headers.publickey, "nonce": headers.nonce, "timestamp" : headers.timestamp, "signature" : headers.signature},
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response=> {
        return response.json();
    })
}

export function Get(url) {
    let headers = {
        "publickey" : PublicKey,
        "nonce" : randomString(10),
        "timestamp" : new Date().getTime(),
        "privatekey" : PrivateKey
    };
    headers.signature = getSign(headers);
    return fetch(`${Config.BasicUrl}/${url}`, {
        headers: {"Content-Type": "application/json",  "publickey" : headers.publickey, "nonce": headers.nonce, "timestamp" : headers.timestamp, "signature" : headers.signature},
        method: 'GET'
    }).then(response=> {
        return response.json();
    })
}