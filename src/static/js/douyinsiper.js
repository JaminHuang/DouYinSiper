$('#search_table').bootstrapTable({minimumCountColumns: 2,
    uniqueId: "id", //每一行的唯一标识，一般为主键列
    height: 320,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    striped: true,//是否显示行间隔色
    pagination: true,//是否显示分页（*）
    pageSize: 5, //每页的记录行数（*）
    pageList: [5,10, 25, 50, 100],//可供选择的每页的行数（*）
//search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    columns: [{field: 'avatar_thumb',
        title: '用户头像',
        width: '5%',
        formatter: function(value,row,index){return '<img src="'+value+'" class="img-circle">';
        }
    },{field: 'id',
        title: '用户ID'
    },{field: 'nickname',
        title: '昵称'
    }, {field: 'unique_id',
        title: '抖音号'
    }, {field: 'follower_count',
        title: '粉丝数'
    }]
});
$('#awemelist_table').bootstrapTable({minimumCountColumns: 2,
    uniqueId: "id", //每一行的唯一标识，一般为主键列
    height: 320,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    striped: true,//是否显示行间隔色
    pagination: true,//是否显示分页（*）
    pageSize: 5, //每页的记录行数（*）
    pageList: [5,10, 25, 50, 100],//可供选择的每页的行数（*）
//search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    columns: [{field: 'aweme_id',
        title: '作品ID'
    },{field: 'digg_count',
        title: '赞数量'
    },{field: 'comment_count',
        title: '评论量'
    },{field: 'share_count',
        title: '分享量'
    },{field: 'reviewed',
        title: '是否审核'
    },{field: 'desc',
        title: '作品描述'
    }]
});
$('#commentlist_table').bootstrapTable({minimumCountColumns: 2,
    uniqueId: "id", //每一行的唯一标识，一般为主键列
//height: 320,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    striped: true,//是否显示行间隔色
    pagination: true,//是否显示分页（*）
    pageSize: 20, //每页的记录行数（*）
    pageList: [5,10, 25, 50, 100],//可供选择的每页的行数（*）
    search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    columns: [{field: 'avatar_thumb',
        title: '用户头像',
        width: '5%',
        formatter: function(value,row,index){return '<img src="'+value+'" class="img-circle">';
        }
    },{field: 'uid',
        title: '用户ID'
    },{field: 'cid',
        title: '评论ID'
    },{field: 'nickname',
        title: '昵称'
    },{field: 'text',
        title: '内容'
    }, {field: 'digg_count',
        title: '赞数量'
    }]
});
/*$("#commentList").bind("change",function(){$("#cid").val($(this).val());
});
$("#awemeList").bind("change",function(){$("#zplist_aweme_id").val($(this).val());
});*/
function search(){//$("#search_userList").html('');
    $('#search_table').bootstrapTable('removeAll');
    layer.load(1, {shade: [0.1,'#fff']});
    $.ajax({type: "GET",
        url: "https://api.douyin.qlike.cn/api.php?act=SearchUser",
        dataType: "json",
        data:"keyword="+$.trim($("#search_keyword").val()),
        success: function(data){layer.closeAll('loading');
            if(data['user_list'].length>0){$.each(data.user_list, function(i, item){$('#search_table').bootstrapTable('append',{id:item.user_info.uid,
                nickname:item.user_info.nickname,
                unique_id:item.user_info.unique_id,
                follower_count:item.user_info.follower_count,
                avatar_thumb:item.user_info.avatar_thumb.url_list[0],
            });
            });
//$("#search_user_id").val(data.user_list[0].user_info.uid);
            }else{layer.msg('什么也没查到！');
            }
        },
        error: function(error) {layer.closeAll('loading');
            layer.msg('出错了，请再试一下！');
        }
    });
}
function getUserInfo(){layer.load(1, {shade: [0.1,'#fff']});
    $.ajax({type: "GET",
        url: "https://api.douyin.qlike.cn/api.php?act=GetUserInFo",
        dataType: "json",
        data:"user_id="+$.trim($("#userinfo_user_id").val()),
        success: function(data){layer.closeAll('loading');
            $('#userinfo_avatar_thumb').attr('src', data.user.avatar_thumb.url_list[0]);
            $("#userinfo_nickname").text(data.user.nickname);
            $("#userinfo_short_id").text(data.user.short_id);
            $("#userinfo_unique_id").text(data.user.unique_id);
            $("#userinfo_signature").text(data.user.signature);
            $("#userinfo_location").text(data.user.location);
            $("#userinfo_school_name").text(data.user.school_name);
            $("#userinfo_birthday").text(data.user.birthday);
            $("#userinfo_total_favorited").text(data.user.total_favorited);
            $("#userinfo_following_count").text(data.user.following_count);
            $("#userinfo_follower_count").text(data.user.follower_count);
            $("#userinfo_favoriting_count").text(data.user.favoriting_count);
            $("#userinfo_aweme_count").text(data.user.aweme_count);
            $("#userinfo_share_url").text(data.user.share_info.share_url);
        },
        error: function(error) {layer.closeAll('loading');
            layer.msg('出错了，请再试一下！');
        }
    });
}
function getAwemeInFo(){layer.load(1, {shade: [0.1,'#fff']});
    $.ajax({type: "GET",
        url: "https://api.douyin.qlike.cn/api.php?act=GetAwemeInFo",
        dataType: "json",
        data:"aweme_id="+$.trim($("#awemeinfo_aweme_id").val()),
        success: function(data){layer.closeAll('loading');
            $("#awemeinfo_author_user_id").text(data.aweme_detail.author_user_id);
            $("#awemeinfo_desc").text(data.aweme_detail.desc);
            $("#awemeinfo_play_count").text("暂时不显示");
            $("#awemeinfo_comment_count").text(data.aweme_detail.statistics.comment_count);
            $("#awemeinfo_digg_count").text(data.aweme_detail.statistics.digg_count);
            $("#awemeinfo_share_count").text(data.aweme_detail.statistics.share_count);
            $("#awemeinfo_is_delete").text(data.aweme_detail.status.is_delete);
            $("#awemeinfo_is_private").text(data.aweme_detail.status.is_private);
            if(data.aweme_detail.status.private_status == 0){$("#awemeinfo_private_status").text("公开");
            }else if(data.aweme_detail.status.private_status == 1){$("#awemeinfo_private_status").text("私密");
            }else if(data.aweme_detail.status.private_status == 2){$("#awemeinfo_private_status").text("好友可见");
            }
            if(data.aweme_detail.status.reviewed == 0){$("#awemeinfo_reviewed").text("未审核");
            }else if(data.aweme_detail.status.reviewed == 1){$("#awemeinfo_reviewed").text("已审核");
            }else{$("#awemeinfo_reviewed").text(data.aweme_detail.status.reviewed);
            }
            $("#awemeinfo_video_play_addr").text(data.aweme_detail.video.play_addr.url_list[0]);
            $("#awemeinfo_share_url").text(data.aweme_detail.share_url);
            $("#awemeinfo_music_play_url").text(data.aweme_detail.music.play_url.url_list[0]);
            var newDate = new Date();
            newDate.setTime(data.aweme_detail.create_time * 1000);
            $("#awemeinfo_create_time").text(newDate.toLocaleString());
        },
        error: function(error) {layer.closeAll('loading');
            layer.msg('出错了，请再试一下！');
        }
    });
}
function getAwemeList(){//$("#awemeList").html('');
    $('#awemelist_table').bootstrapTable('removeAll');
    layer.load(1, {shade: [0.1,'#fff']});
    $.ajax({type: "GET",
        url: "https://api.douyin.qlike.cn/api.php?act=GetAwemeList",
        dataType: "json",
        data:"user_id="+$.trim($("#awemelist_user_id").val()),
        success: function(data){layer.closeAll('loading');
            $.each(data.aweme_list, function(i, item){var is_reviewed = item.status.reviewed?'已审核':'未审核';
                $('#awemelist_table').bootstrapTable('append',{aweme_id:item.aweme_id,
                    digg_count:item.statistics.digg_count,
                    reviewed:is_reviewed,
                    comment_count:item.statistics.comment_count,
                    share_count:item.statistics.share_count,
                    desc:item.desc
                });
            });
        },
        error: function(error) {layer.closeAll('loading');
            layer.msg('出错了，请再试一下！');
        }
    });
}
function getCommentList(isnew){if(isnew){$("#commentlist_aweme_id").attr("page",1);
}
//$("#commentList").html('');
    $('#commentlist_table').bootstrapTable('removeAll');
    layer.load(1, {shade: [0.1,'#fff']});
    $.ajax({type: "GET",
        url: "https://api.douyin.qlike.cn/api.php?act=GetCommentList",
        dataType: "json",
        data:"aweme_id="+$.trim($("#commentlist_aweme_id").val())+"&page="+$("#commentlist_aweme_id").attr("page"),
        success: function(data){layer.closeAll('loading');
            $.each(data.comments, function(i, item){//$("#commentlist_list").append("<option value='"+item.cid+"'>"+"[昵称 =>"+item.user.nickname+"][内容 =>"+item.text+"][赞数量=>"+item.digg_count+"]</option>");
                $('#commentlist_table').bootstrapTable('append',{avatar_thumb:item.user.avatar_thumb.url_list[0],
                    uid:item.user.uid,
                    cid:item.cid,
                    nickname:item.user.nickname,
                    text:item.text,
                    digg_count:item.digg_count
                });
            });
//$("#commentlist_cid").val(data.comments[0].cid);
            $("#commentlist_aweme_id").attr("page",parseInt($("#commentlist_aweme_id").attr("page"))+1);
        },
        error: function(error) {layer.closeAll('loading');
            layer.msg('出错了，请再试一下！');
        }
    });
}
//百度自动推送
(function(){var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();