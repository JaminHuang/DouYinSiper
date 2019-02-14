/**
 * 创建时间：2019年2月14日 15:21:53
 * 创建人：JaminHuang
 * 描述：页面组件-主文件
 */
'use strict';
import React,{ Component } from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb } from 'antd';
import Left from '../components/left';
import indexStyle from '../static/style/index.css';
import antdStyle from 'antd/dist/antd.min.css';
const SubMenu = Menu.SubMenu;

class Container extends Component {
    componentWillMount() {
        indexStyle.use();
        antdStyle.use();
    }

    itemRender(route, params, routes, paths) {
        return <Link to={route.path}>{route.breadcrumbName}</Link>;
    }

    render() {
        const { children,routes,params } = this.props;
        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">
                        <div className="ant-layout-logo-div"><p className="ant-layout-logo-div-p">抖音辅助平台</p></div>
                    </div>
                    <Left />
                </aside>
                <div className="ant-layout-main">
                    <div className="ant-layout-header" />
                    <div className="ant-layout-breadcrumb">
                        {routes != null ?
                            <Breadcrumb routes={routes} params={params}
                                        itemRender={(route, params, routes, paths)=>this.itemRender(route, params, routes, paths)} /> : null}
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <div style={{minHeight:'459px'}}>
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer" style={{padding:0}}>
                        版权所有 © Grace & Amazing 2018-2019 | JaminHuang
                    </div>
                </div>
            </div>
        )
    }
}

export default Container;