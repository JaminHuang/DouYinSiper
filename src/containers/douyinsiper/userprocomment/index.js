'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Request } from '../../../service';
import { UserProductCommentList } from '../../../components/user';
import { Form,Input,Button,Popover,Pagination,Icon,message } from 'antd';
import enUS from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;
const Search = Input.Search;

import indexStyle from '../../../static/style/common.css';

class UserProductComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            total:0,
            visible: false,
            selectValue: { txtPid:"" },
            model: []
        }
    }

    componentWillMount() {
        indexStyle.use()
    }

    componentDidMount() {

    }

    addAutoCommentInfo(title, text) {
        Request.Post("server/street/autocomment", { title: title, content: text}).then(json=>{ })
    }

    /*请求接口,获取产品评论列表*/
    getProductInfo(pid) {
        let { page,showNextBtn } = this.state;
        this.setState({loading:true});
        Request.FetchGet("api.php?act=GetCommentList&aweme_id="+pid+"&page=1").then(json=>{
            if (json.comments !== undefined) {
                showNextBtn = json.comments.length === 20;
                this.setState({loading:false, model:json.comments})
            }
            else {
                message.error('没有找到评论数据');
                this.setState({loading:false});
            }
        })
    }

    /*获取总评论数*/
    getCommentCount(pid) {
        Request.FetchGet("api.php?act=GetAwemeInFo&aweme_id="+pid).then(json=>{
            if (json.status_code === 0) {
                if(json.aweme_detail !== undefined){
                    this.setState({total:json.aweme_detail.statistics.comment_count});
                }
            }
            else {
                message.error(json.status_msg);
            }
        })
    }

    /*导出*/
    downData(title) {
        let { total,selectValue } = this.state;
        let page = 1, totalPage = (total / 20) + 1;
        let that = this;
        if(title.length < 1 || selectValue.txtPid === "") {
            message.error('标题或产品ID不能为空');
            return;
        }
        that.setState({loading:true});
        while (page <= totalPage) {
            Request.FetchGet("api.php?act=GetCommentList&aweme_id="+selectValue.txtPid+"&page=" + page).then(json=>{
                if (json.comments !== undefined) {
                    _.forEach(json.comments, function (n) {
                        that.addAutoCommentInfo(title, n.text);
                    })
                }
            });

            page = page + 1
        }
        that.setState({loading:false});
    }

    handleVisibleChange(visible) {
        this.setState({visible});
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values)=> {
            if (!errors) {
                this.getProductInfo(values.txtPid);
                this.getCommentCount(values.txtPid);
                this.setState({selectValue:{txtPid: values.txtPid}});
            }
        })
    }

    changePage(page, pageSize) {
        let { selectValue } = this.state;
        this.setState({loading:true});
        Request.FetchGet("api.php?act=GetCommentList&aweme_id="+selectValue.txtPid+"&page=" + page).then(json=>{
            if (json.comments !== undefined) {
                this.setState({loading:false, model:json.comments})
            }
            else {
                message.error('没有找到评论数据');
                this.setState({loading:false});
            }
        })
    }

    render() {
        let { form } = this.props;
        let { selectValue,visible } = this.state;
        const { getFieldDecorator } = form;

        return (
            <div className="proinfo">
                <Form layout="inline">
                    <FormItem>
                        {
                            getFieldDecorator('txtPid', {
                                initialValue: selectValue && selectValue.txtPid ? selectValue.txtPid : "",
                                rules: [{ required:true, message:'产品ID不能为空' }]
                            })(
                                <Input style={{width:300}} addonBefore={<Icon type="star" />} placeholder="填入抖音产品ID" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="search" onClick={()=>this.handleSubmit()}>搜 索</Button>
                    </FormItem>
                    <div style={{float:'right'}}>
                        <Popover content={ <Search placeholder="输入话题" onSearch={value => this.downData(value)} /> } placement="bottom" trigger="click" visible={visible} onVisibleChange={(visible)=>this.handleVisibleChange(visible)} >
                            <Button type="danger" icon="download" size="large" >导 出</Button>
                        </Popover>
                    </div>
                </Form>
                <hr />
                <UserProductCommentList list={this.state.model} listLoading={this.state.loading} />
                <Pagination style={{marginTop:"8px"}} showTotal={total => `共 ${total} 条`} total={this.state.total} hideOnSinglePage={true} defaultPageSize={20}
                            showQuickJumper={true} onChange={(page,pageSize)=>this.changePage(page,pageSize)} />
            </div>
        )
    }
}

UserProductComment = Form.create()(UserProductComment);

export default UserProductComment;