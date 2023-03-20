//提示语句
function tsy(tsy) {
    $("#ts").html(tsy);
    $("#ts").fadeToggle(1300);
    $("#ts").fadeToggle(1300);
}
//渲染老师数据
xr = () => {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/thpost",
        success: (eew) => {
            $("#tbody").html(eew)
        }
    }
    )
}
xr()
//去除空格
function qkg(ew) {
    let qkgh = ew.replace(/\s*/g, "");
    return qkgh
}
//调用渲染班级
function xrtj() {
    xrclass("#classname1")
}
//渲染班级
function xrclass(obj) {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/thpostxrtj",
        success: (eew) => {
            $(obj).html(eew)
        }
    }
    )
}
//创建老师class
class Teacher {
    constructor(id, teachername, cid) {
        this.id = id,
            this.teachername = teachername,
            this.cid = cid;
    }
}
//添加老师数据
function tianjia() {
    if ($("#teachername1").val().replace(/\s*/g, "") == '' || $("#classname1").val()==null) {
        tsy("教师名称或班级名称不得为空")
        return
    }
    let cas = new Teacher(1, qkg($("#teachername1").val()), qkg($("#classname1").val()));
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/thposttj",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("添加成功");
                $("#myModal").modal("hide");
                xr()
                $("#teachername1").val("");
                $("#classname1").val("");
            }
        }
    })
}
//删除指定老师数据
function shan(id) {
    let shan = {
        "id": id
    }
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/api/thdeleteshan",
        data: shan,
        success: (eew) => {
            if (eew == "z") {
                tsy("删除成功");
                xr()
            }
        }
    })
}
//修改回显老师数据
function xiugai(id) {
    xrclass("#classname2")
    let xiugai = {
        "id": id
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/thputxiugai",
        data: xiugai,
        success: (eew) => {
            $("#teachername2").val(eew.teachername);
            $("#classname2").val(eew.cid);
        }
    })
}
//修改指定老师数据
function xg() {
    if ($("#teachername2").val().replace(/\s*/g, "") == '' || $("#classname2").val().replace(/\s*/g, "") == '') {
        tsy("教师名称或班级名称不得为空")
        return
    }
    let xiugai = {
        "teachername": qkg($("#teachername2").val()),
        "cid": $("#classname2").val()
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/thputxg",
        data: xiugai,
        success: (eew) => {
            if (eew == "z") {
                tsy("修改成功")
                $("#myModal2").modal("hide");
                xr()
                $("#teachername2").val("");
                $("#classname2").val("");
            }
        }
    })
}
//查找指定老师数据
function chazhao() {
    let cz = {
        name: qkg($("#chazhao").val())
    }
    if (cz.name == '') {
        xr()
        return
    }
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/thgetchazhao",
        data: cz,
        success: (eew) => {
            $("#tbody").html(eew)
        }
    })
}