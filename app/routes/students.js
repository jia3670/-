var express = require('express');
var router = express.Router();
let fs = require('fs')
let zstu = null;
function stucun(cid, id) {
    let classe = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classe);
    for (let i = 0; i < classnames.length; i++) {
        if (cid == classnames[i].id) {
            classnames[i].stuid[classnames[i].stuid.length == undefined ? 0 : classnames[i].stuid.length] = id;
            fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                return
            })
        }
    }
}

function stushan(id) {
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    for (let i = 0; i < classnames.length; i++) {
        for (let j = 0; j < classnames[i].stuid.length; j++) {
            if (classnames[i].stuid[j] == id) {
                classnames[i].stuid.splice(j, 1);
            }
        }
    }
    fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
        return
    })
}


router.post("/api/stupost", (req, resp) => {
    let student = fs.readFileSync("./api/students.txt");
    let students = JSON.parse(student);
    let s = '';
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    let teacher = fs.readFileSync("./api/teacher.txt");
    let teachers = JSON.parse(teacher);
    function cla(ew) {
        for (let item of classnames) {
            if (item.id == ew) {
                return item.classname
            }
        }
    }
    function thname(ew) {
        let ser = [];
        for (let items of classnames) {
            if (items.id == ew) {
                for (let item2 of items.tid) {
                    for (let item3 of teachers) {
                        if (item2 == item3.id) {
                            ser[ser.length] = item3.teachername
                        }
                    }
                }
            }
        }
        ser = ser.join(',')
        return ser;
    }

    if (students == '' || students == [] || students == undefined) {
        s = `<tr><td colspan="5">暂无学生数据</td></tr>`
        return s
    }
    for (let i = 0; i < students.length; i++) {
        s += `<tr>
              <td>${i + 1}</td>
              <td>${students[i].stu_name}</td>
              <td>${students[i].stu_age}</td>
              <td>${students[i].stu_sex}</td>
              <td>${cla(students[i].classname)}</td>
              <td>${thname(students[i].classname)}</td>
              <td><button onclick="shan(${students[i].id})">删除</button><button onclick="xiugai(${students[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
              <td></td>
            </tr>`
    }
    return resp.end(s)
})
router.post("/api/stupostxrtj", (req, resp) => {
    let use = fs.readFileSync("./api/classnames.txt");
    let user = JSON.parse(use);
    let s = '';
    if (user == '' || user == [] || user == undefined) {
        s = `<option disabled="disabled">暂无数据</option>`
        return resp.end(s)
    }
    for (let i = 0; i < user.length; i++) {
        s += `<option value="${user[i].id}">${user[i].classname}</option>`
    }
    return resp.end(s)
})
router.post("/api/stuposttj", (req, resp) => {
    let query = req.body;
    let use = fs.readFileSync("./api/students.txt");
    if (use == '' || use == [] || use == undefined) {
        fs.writeFile("./api/classnames.txt", `[${JSON.stringify(query)}]`, function () {
            stucun(query.classname, query.id)
            return resp.send("z")
        })
    }
    let user = JSON.parse(use);
    query.age = parseInt(query.age)
    query.classname = parseInt(query.classname)
    query.id = parseInt(user[user.length - 1].id) + 1;
    user[user.length] = query;
    fs.writeFile("./api/students.txt", JSON.stringify(user), function () {
        stucun(query.classname, query.id)
        return resp.send("z")
    })
})
router.delete("/api/studeleteshan", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/students.txt");
    let user = JSON.parse(use);
    for (let i in user) {
        if (query == user[i].id) {
            user.splice(i, 1);
            break
        }
    }
    fs.writeFile("./api/students.txt", JSON.stringify(user), function () {
        stushan(query)
        return resp.send("z")
    })
})
router.put("/api/stuputxiugai", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/students.txt");
    let user = JSON.parse(use);
    for (let i in user) {
        if (query == user[i].id) {
            zstu = user[i].id;
            let s = {
                name: user[i].stu_name,
                age: user[i].stu_age,
                sex: user[i].stu_sex,
                classname: user[i].classname
            }
            return resp.send(s)
        }
    }
})
router.put("/api/stuputxg", (req, resp) => {
    let query = req.body;
    let use = fs.readFileSync("./api/students.txt");
    let user = JSON.parse(use);
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == zstu) {
            function stus() {
                for (let i = 0; i < classnames.length; i++) {
                    for (let j = 0; j < classnames[i].stuid.length; j++) {
                        if (classnames[i].stuid[j] == zstu) {
                            classnames[i].stuid.splice(j, 1);
                        }
                    }
                }
                fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                    console.log("删除成功");
                })
            }
            stus()
            function stuxiu() {
                for (let j = 0; j < classnames.length; j++) {
                    if (query.classname == classnames[j].id) {
                        classnames[j].stuid[(classnames[j].stuid.length == undefined || classnames[j].stuid.length == [] || classnames[j].stuid.length == '') ? 0 : classnames[j].stuid.length] = zstu;
                        fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                            console.log("修改成功");
                        })
                    }
                }
            }
            stuxiu()
            user[i].stu_name = query.stu_name;
            user[i].stu_age = parseInt(query.stu_age);
            user[i].stu_sex = query.stu_sex;
            user[i].classname = parseInt(query.classname);
            break
        }
    }
    fs.writeFile("./api/students.txt", JSON.stringify(user), function () {
        return resp.send("z")
    })
})
router.get("/api/stugetchazhao", (req, resp) => {
    let query = req.query;
    let student = fs.readFileSync("./api/students.txt");
    let students = JSON.parse(student);
    let s = '';
    let biao = false;
    let ss = 0
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    let teacher = fs.readFileSync("./api/teacher.txt");
    let teachers = JSON.parse(teacher);
    function cla(ew) {
        for (let item of classnames) {
            if (item.id == ew) {
                return item.classname
            }
        }
    }
    function thname(ew) {
        let ser = [];
        for (let items of classnames) {
            if (items.id == ew) {
                for (let item2 of items.tid) {
                    for (let item3 of teachers) {
                        if (item2 == item3.id) {
                            ser[ser.length] = item3.teachername
                        }
                    }
                }
            }
        }
        ser = ser.join(',')
        return ser;
    }
    for (let i = 0; i < students.length; i++) {
        if (students[i].stu_name.indexOf(query.name) >= 0) {
            biao = true;
            s += `<tr>
        <td>${i + 1}</td>
        <td>${students[i].stu_name}</td>
        <td>${students[i].stu_age}</td>
        <td>${students[i].stu_sex}</td>
        <td>${cla(students[i].classname)}</td>
        <td>${thname(students[i].classname)}</td>
        <td><button onclick="shan(${students[i].id})">删除</button><button onclick="xiugai(${students[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
        <td></td>
      </tr>`
        }
    }
    if (biao == false) {
        s += `<tr><td colspan="8">暂无筛选数据</td></tr>`
    }
    return resp.send(s)
})

module.exports = router;
