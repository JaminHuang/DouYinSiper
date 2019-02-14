/**
 * 左侧导航栏配置
 */
'use strict';
import React,{PropTypes} from 'react';
import { Menu,Icon } from 'antd';
import { Link } from 'react-router';

const Left = () => {
    return (
        <Menu theme="dark" defaultOpenKeys={['sub1']} mode="inline">
            <Menu.Item key="index"><Link to="/"><Icon type="home"/>首页</Link></Menu.Item>
            <Menu.SubMenu key="sub1" title={<span><Icon type="line-chart" />抖音爬虫</span>}>
                <Menu.Item><Link to="/user/info">获取用户信息</Link></Menu.Item>
                <Menu.Item><Link to="/user/product">获取用户作品列表</Link></Menu.Item>
                <Menu.Item><Link to="/user/product/info">获取作品信息</Link></Menu.Item>
                <Menu.Item><Link to="/user/product/list">获取作品评论列表</Link></Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};
export default Left;