//登录
$("#login").click(function () {
    let stus = new Stue($('#userl').val(), $('#passwordl').val());
    $.ajax({
        type: 'post',
        url: "http://localhost:3000/api/addById3",
        data:stus,
        success: function (enw) {
            if (enw == true) {
                alert("用户名或密码错误")
            }
            if (enw == "gl") {
                alert("登陆成功 ")
                window.location.href = "../../bootstrap框架2/index.html"
                $('#userl').val("")
                $('#passwordl').val("")
            }
            if (enw == "yh") {
                alert("登陆成功 ")
                window.location.href = "../../bootstrap框架2/index.html"
                $('#userl').val("")
                $('#passwordl').val("")
            }
            if(enw=="ccw"){
                alert("暂无数据请注册")
            }
        }
    })
})