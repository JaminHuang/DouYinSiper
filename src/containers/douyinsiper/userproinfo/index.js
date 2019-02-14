'use strict';
import React, { Component } from 'react';
import { Request } from '../../../service';
import { getTime } from '../../../service/common';
import copy from 'copy-to-clipboard';
import { Form,Spin,Card,Input,Button,Icon,message } from 'antd';
import enUS from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;

import indexStyle from '../../../static/style/common.css';

class UserProInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectValue: { txtPid:"" },
            item: {user_id:"",aweme_id:"",desc:"",comment_count:"",digg_count:"",share_count:"",is_reviewed:"",share_url:"",video_play_addr:"",music_play_url:"",create_time:""}
        }
    }

    componentWillMount() {
        indexStyle.use()
    }

    componentDidMount() {

    }

    /*请求接口,获取产品信息*/
    getProductInfo(pid) {
        this.setState({loading:true});
        Request.FetchGet("api.php?act=GetAwemeInFo&aweme_id="+pid).then(json=>{
            if (json.status_code === 0) {
                let item = {
                    user_id:json.aweme_detail.author_user_id,
                    aweme_id:json.aweme_detail.aweme_id,
                    desc:json.aweme_detail.desc,
                    comment_count:json.aweme_detail.statistics.comment_count,
                    digg_count:json.aweme_detail.statistics.digg_count,
                    share_count:json.aweme_detail.statistics.share_count,
                    is_reviewed:json.aweme_detail.status.reviewed,
                    share_url:json.aweme_detail.share_url,
                    video_play_addr:json.aweme_detail.video.play_addr.url_list[0],
                    music_play_url:json.aweme_detail.music.play_url.url_list[0],
                    create_time:getTime(json.aweme_detail.create_time),
                };
                this.setState({item,loading:false});
            }
            else {
                message.error(json.status_msg);
                this.setState({loading:false});
            }

        })
    }

    handleSubmit() {
        let { formType } = this.state;
        this.props.form.validateFields((errors, values)=> {
            if (!errors) {
                this.getProductInfo(values.txtPid);
            }
        })
    }

    copyUrl(url) {
        copy(url);
        message.success('复制成功,如果失败,请手动复制.', 1);
    }

    render() {
        let { form } = this.props;
        let { item, selectValue } = this.state;
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
                                <Input addonBefore={<Icon type="star" />} placeholder="填入抖音产品ID" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="search" onClick={()=>this.handleSubmit()}>搜 索</Button>
                    </FormItem>
                </Form>
                <hr />
                <Spin tip="数据查询中" spinning={this.state.loading}>
                    <input type="hidden" id="addr" value="" />
                    <div className="content">
                        <Card title="产品信息">
                            <p>用户ID：{item.user_id}</p>
                            <p>作品描述：{item.desc}</p>
                            <p>评论量：{item.comment_count}</p>
                            <p>点赞量：{item.digg_count}</p>
                            <p>分享量：{item.share_count}</p>
                            <p>审核：{item.is_reviewed === 0 ? "未审核" : "已审核"}</p>
                            <p>链接：{item.share_url !== "" ? <a onClick={(url)=>this.copyUrl(item.share_url)}>点击复制</a> : <psan className="red">暂无地址</psan>}</p>
                            <p>无水印链接：{item.video_play_addr.trim() !== "" ? <a onClick={(url)=>this.copyUrl(item.video_play_addr)}>点击复制</a> : <psan className="red">暂无地址</psan>}</p>
                            <p>背景音乐链接：{item.music_play_url  !== "" ? <a onClick={(url)=>this.copyUrl(item.music_play_url)}>点击复制</a> : <psan className="red">暂无地址</psan>}</p>
                            <p>创建时间：{item.create_time}</p>
                        </Card>
                    </div>
                </Spin>
            </div>
        )
    }
}

UserProInfo = Form.create()(UserProInfo);

export default UserProInfo;