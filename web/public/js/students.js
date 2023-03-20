 //提示语句
 function tsy(tsy) {
    $("#ts").html(tsy);
    $("#ts").fadeToggle(1300);
    $("#ts").fadeToggle(1300);
}
//渲染学生数据
xr = () => {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/stupost",
        success: (eew) => {
            $("#tbody").html(eew)
        }
    }
    )
}
xr()
//清除空格
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
        url: "http://localhost:3000/api/stupostxrtj",
        success: (eew) => {
            $(obj).html(eew)
        }
    }
    )
}
//判断学生性别（添加）
function stu_sex() {
    let stu_sex = document.getElementById('stu_man').checked ? document.getElementById('stu_man').value : document.getElementById('stu_woman').value;
    return stu_sex;
}
//判断学生性别（修改）
function stu_sexxg() {
    let stu_sexeer = document.getElementById('stu_manx').checked ? document.getElementById('stu_manx').value : document.getElementById('stu_womanx').value;
    return stu_sexeer;
}
//创建学生修改class
class Student {
    constructor(id, stu_name, stu_age, stu_sex, classname) {
        this.id = id;
        this.stu_name = stu_name;
        this.stu_age = stu_age;
        this.stu_sex = stu_sex;
        this.classname = classname;
    }
}
//添加学生数据
function tianjia() {
    if ($("#stu_name").val().replace(/\s*/g, "") == '' || $("#stu_age").val().replace(/\s*/g, "") == '' || stu_sex() == '' || $("#classname1").val().replace(/\s*/g, "") == '') {
        tsy("所有数据均要添加")
        return
    }
    let cas = new Student(1, qkg($("#stu_name").val()), qkg($("#stu_age").val()), stu_sex(), qkg($("#classname1").val()));
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/stuposttj",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("添加成功");
                $("#myModal").modal("hide");
                xr()
                $("#stu_name").val("");
                $("#stu_age").val("")
                $("#classname1").val("");
            }
        }
    })
}
//删除指定学生数据
function shan(id) {
    let shan = {
        "id": id
    }
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/api/studeleteshan",
        data: shan,
        success: (eew) => {
            if (eew == "z") {
                tsy("删除成功");
                xr()
            }
        }
    })
}
//判断学生修改回显性别
function stu_sexx(sex) {
    if (sex == "男") {
        return $("#stu_manx").attr("checked", true)
    } else {
        return $("#stu_womanx").attr("checked", true)
    }
}
//修改回显学生数据
function xiugai(id) {
    xrclass("#classname2")
    let xiugai = {
        "id": id
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/stuputxiugai",
        data: xiugai,
        success: (eew) => {
            $("#stu_namex").val(eew.name);
            $("#stu_agex").val(eew.age)
            stu_sexx(eew.sex)
            $("#classname2").val(eew.classname);
        }
    })
}
class Studentx {
constructor(stu_name, stu_age, stu_sex, classname) {
    this.stu_name = stu_name;
    this.stu_age = stu_age;
    this.stu_sex = stu_sex;
    this.classname = classname;
}
}
//修改指定学生数据
function xg() {
    if ($("#stu_namex").val().replace(/\s*/g, "") == '' || $("#stu_agex").val().replace(/\s*/g, "") == '' || stu_sexxg() == '' || $("#classname2").val().replace(/\s*/g, "") == '') {
        tsy("所有数据均要添加")
        return
    }
    let xiugai = new Studentx(qkg($("#stu_namex").val()), qkg($("#stu_agex").val()), stu_sexxg(), qkg($("#classname2").val()));
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/stuputxg",
        data: xiugai,
        success: (eew) => {
            if (eew == "z") {
                tsy("修改成功")
                $("#myModal2").modal("hide");
                xr()
                $("#stu_namex").val("");
                $("#stu_agex").val("")
                $("#classname2").val("");
            }
        }
    })
}
//查找指定学生数据
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
        url: "http://localhost:3000/api/stugetchazhao",
        data: cz,
        success: (eew) => {
            $("#tbody").html(eew)
        }
    })
}