//登录
$("#login").click(function () {
    let stus = new Stue($('#userl').val(), $('#passwordl').val());
    $.ajax({
        type: 'post',
        url: "http://localhost:3000/api/addById3",
        data: stus,
        success: function (name) {
            if (name == "ccw") {
                alert("暂无数据请注册")
            }
            if (name == "true") {
                alert("用户名或密码错误")
            }
            if (name.ccc == "gl") {
                alert("登陆成功 ")
                sessionStorage.token = name.token;
                window.location.href = "../../bootstrap框架2/index.html"
                $('#userl').val("")
                $('#passwordl').val("")
            }
            if (name.ccc == "yh") {
                alert("登陆成功 ")
                sessionStorage.token = name.token;
                window.location.href = "../../bootstrap框架2/index.html"
                $('#userl').val("")
                $('#passwordl').val("")
            }

        }
    })
})