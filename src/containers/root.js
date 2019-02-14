/**
 * 创建时间：2019年2月14日 15:25:17
 * 创建人：JaminHuang
 * 描述：主路由文件
 */
'use strict';
import Index from './';
import { UserInfo, UserProduct, UserProductList, UserProductComment } from './douyinsiper'

export default {
    component: Index,
    path: '/',
    breadcrumbName:"首页",
    childRoutes: [
        {
            breadcrumbName:"获取用户信息",
            component: UserInfo,
            path: 'user/info'
        },
        {
            breadcrumbName:"获取用户作品列表",
            component: UserProductList,
            path: 'user/product'
        },
        {
            breadcrumbName:"获取作品信息",
            component: UserProduct,
            path: 'user/product/info'
        },
        {
            breadcrumbName:"获取作品评论列表",
            component: UserProductComment,
            path: 'user/product/list'
        }
    ]
}