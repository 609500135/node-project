$(function () {

    var pageNum = 1;
    var pageSize = 2;

    //默认调用一次seach
    search(pageNum, pageSize);



    $('#bannerAdd').click(function () {

        $.post('/banner/add', {
            bannerName: $('#inputEmail3').val(),
            bannerUrl: $('#inputPassword3').val()
        }, function (res) {
            console.log(res);
            if (res.code === 0) {
                layer.msg('添加成功');

                //成功
            } else {
                //ps:很多时候真正的错误信息，不会给到用户去看
                console.log(res.msg);
                layer.msg('网络异常，请稍后重试');
            }

            //手动调用关闭的方法
            $('#myModal').modal('hide');
            //手动清空输入框的内容
            $('#inputEmail3').val('');
            $('#inputPassword3').val('');
        });
    })
})

/**
 * 查询banner数据方法
 *  @param {Number} pageNum 当前的页数
 *  @param {Number} pageSize 每页显示的条数
 */


function search(pageNum, pageSize) {
    $.get('/banner/search', {
        pageNum: pageNum,
        pageSize: pageSize
    }, function (result) {
        if (result.code === 0) {
            layer.msg('查询成功');

            
            for(var i =0; i < result.data.length; i++) {
                var item = result.data[i];
                $('#banner-table tbody').append(
                    `
                      <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td><img class="banner-img" src="${item.imgUrl}"</td>
                        <td>
                            <a href="javascript:;">删除</a>
                            <a href="javascript:;">修改</a>
                        </td>
                      
                      </tr>
                    `
                )
            }
        } else {
            console.log(result.msg);
            layer.msg('网络异常，请稍后重试');
        }
    })
}
