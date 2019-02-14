'use strict';
import React, { Component } from 'react';
import { Table } from 'antd';

let UserProductCommentList = ({list, listLoading, select }) => {

    const columns = [
        {
            title:'用户ID',
            dataIndex:'user.uid',
            key:'user.uid'
        },
        {
            title:'评论ID',
            dataIndex:'cid',
            key:'cid'
        },
        {
            title:'赞',
            dataIndex:'digg_count',
            key:'digg_count'
        },
        {
            title:'内容',
            dataIndex:'text',
            key:'text'
        }
    ];
    let dataSource = list;

    return (
        <Table rowKey={record => record.cid} loading={listLoading} dataSource={dataSource} columns={columns} style={{marginTop:"8px"}} size="small" pagination={false} />
    )
};

export default UserProductCommentList;