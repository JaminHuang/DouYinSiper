'use strict';
import React, { Component } from 'react';
import { Request } from '../../../service';
import { UserProductCommentList } from '../../../components/user';
import { Form,Input,Button,Icon,message } from 'antd';
import enUS from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;

import indexStyle from '../../../static/style/common.css';

class UserProductComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page:1,
            showLastBtn : false,
            showNextBtn : false,
            selectValue: { txtPid:"" },
            model: []
        }
    }

    componentWillMount() {
        indexStyle.use()
    }

    componentDidMount() {

    }

    /*请求接口,获取产品评论列表*/
    getProductInfo(pid) {
        let { page,showNextBtn } = this.state;
        this.setState({loading:true});
        Request.FetchGet("api.php?act=GetCommentList&aweme_id="+pid+"&page=1").then(json=>{
            if (json.comments !== undefined) {
                showNextBtn = json.comments.length === 20;
                this.setState({loading:false, model:json.comments,showLastBtn:false,showNextBtn})
            }
            else {
                message.error('没有找到评论数据');
                this.setState({loading:false});
            }
        })
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values)=> {
            if (!errors) {
                this.getProductInfo(values.txtPid);
                this.setState({selectValue:{txtPid: values.txtPid}});
            }
        })
    }

    lastPage() {
        let { page,showLastBtn,selectValue } = this.state;
        this.setState({loading:true});
        page = page - 1;
        Request.FetchGet("api.php?act=GetCommentList&aweme_id="+selectValue.txtPid+"&page=" + page).then(json=>{
            if (json.comments !== undefined) {
                showLastBtn = page > 1;
                this.setState({loading:false, model:json.comments,showLastBtn,showNextBtn:true,page})
            }
            else {
                message.error('没有找到评论数据');
                this.setState({loading:false,showLastBtn:false,showNextBtn:true});
            }
        })
    }

    nextPage() {
        let { page,showNextBtn,selectValue } = this.state;
        this.setState({loading:true});
        page = page + 1;
        Request.FetchGet("api.php?act=GetCommentList&aweme_id="+selectValue.txtPid+"&page=" + page).then(json=>{
            if (json.comments !== undefined) {
                showNextBtn = json.comments.length === 20;
                this.setState({loading:false, model:json.comments,showLastBtn:true,showNextBtn,page})
            }
            else {
                message.error('没有找到评论数据');
                this.setState({loading:false,showNextBtn:false,showLastBtn:true});
            }
        })
    }

    render() {
        let { form } = this.props;
        let { item, selectValue,showLastBtn,showNextBtn } = this.state;
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
                </Form>
                <hr />
                <UserProductCommentList list={this.state.model} listLoading={this.state.loading} />
                <div className="pagination">
                    {showLastBtn ? <div className="lend" style={{marginTop:5, marginLeft:10}} onClick={()=>this.lastPage()} >
                        <a>上一页</a>
                    </div> : null}
                    {showNextBtn ? <div className="lend" style={{marginTop:5, marginLeft:10}} onClick={()=>this.nextPage()} >
                        <a>下一页</a>
                    </div> : null}
                </div>
            </div>
        )
    }
}

UserProductComment = Form.create()(UserProductComment);

export default UserProductComment;