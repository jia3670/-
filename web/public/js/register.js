rer = (selector) => {
    return document.querySelector(selector)
}
var _gologin = rer('#go-login')
var _goreg = rer('#go-reg')
var _logx1 = rer('#logx1')
var _logx2 = rer('#logx2')
var _regx1 = rer('#regx1')
var _regx2 = rer('#regx2')

// 跳转动画
window.onload = function () {
    animationlogin = () => {
        return (_logx1.style.left = '0',
            _logx2.style.right = '0',
            _regx1.style.left = '-380px',
            _regx2.style.right = '-580px')
    }
    _gologin.addEventListener('click', function () {
        animationlogin()
    })
    animationreg = () => {
        _logx1.style.left = '-580px'
        _logx2.style.right = '-380px'
        _regx1.style.left = '0'
        _regx2.style.right = '0'
    }
    animationreg()
    _goreg.addEventListener('click', function () {
        animationreg()
    })
}
let ss = /^[\u4e00-\u9fa5]{2,8}$/;
let se = /^\d{4,16}$/;
$("#user").on("input", function () {
    if ($("#user").val() == '') {
        $("#usere").css("display", "none");
        $("#usere").text();
        return
    }
    if (!(ss.test($("#user").val()))) {
        $("#usere").css("display", "block");
        $("#usere").css("color", "red");
        $("#usere").text("请输入2~8位中文");
        return
    } else {
        $("#usere").css("display", "none");
        $("#usere").text();
        return
    }
})
$("#password").on("input", function () {
    if ($("#password").val() == '') {
        $("#passworde").css("display", "none");
        $("#passworde").text();
        return
    }
    if (!(se.test($("#password").val()))) {
        $("#passworde").css("display", "block");
        $("#passworde").css("color", "red");
        $("#passworde").text("请输入4~16位数字");
        return
    } else {
        $("#passworde").css("display", "none");
        $("#passworde").text();
        return
    }
})
$("#passwordz").on("input", function () {
    if ($("#passwordz").val() == '') {
        $("#passwordze").css("display", "none");
        $("#passwordze").text();
        return
    }
    if (!(se.test($("#passwordz").val()))) {
        $("#passwordze").css("display", "block");
        $("#passwordze").css("color", "red");
        $("#passwordze").text("请输入4~16位数字");
        return
    } else if ($("#passwordz").val() != $("#password").val()) {
        $("#passwordze").css("display", "block");
        $("#passwordze").css("color", "red");
        $("#passwordze").text("两次密码输入不一致");
        return
    } else {
        $("#passwordze").css("display", "none");
        $("#passwordze").text();
        return
    }
})
class Stu {
    constructor(id, user, password, quanxian) {
        this.id = id;
        this.user = user.replace(/\s*/g,"");
        this.password = password.replace(/\s*/g,"");
        this.quanxian = quanxian;
    }
}

let a = 0;
// function wwh() {
//     let data = new Date();
//     let year = data.getFullYear()
//     let month = data.getMonth() + 1
//     month = month > 10 ? month : '0' + month
//     let day = data.getDate()
//     day = day > 10 ? day : '0' + day
//     let h = data.getHours()
//     h = h > 10 ? h : '0' + h
//     let m = data.getMinutes()
//     m = m > 10 ? m : '0' + m
//     let timeq = year + "-" + month + '-' + day + 'T' + h + ':' + m
//     return timeq
// }
class Stue {
    constructor(user, password) {
        this.user = user.replace(/\s*/g,"");
        this.password = password.replace(/\s*/g,"");
    }
}

