//注册
$("#register").click(function () {
    if (!(ss.test($("#user").val())) || !(se.test($("#password").val())) || !(se.test($("#passwordz").val())) || $("#password").val() != $("#passwordz").val()) {
        alert("用户名或密码格式不正确")
        return
    }
    let stus = new Stu(a, $('#user').val(), $('#password').val(), $("#quanxian").val());
    $.ajax({
        type: 'post',
        url: "http://localhost:3000/api/addById2",
        data: stus,
        success: function (enw) {
            if (enw == 'c') {
                alert("用户名重复")
            }
            if (enw == "z") {
                alert("注册成功 ")
                animationlogin()
                $('#password').val("");
                $('#passwordz').val("");
                $('#user').val("");
            }

        }
    })
})