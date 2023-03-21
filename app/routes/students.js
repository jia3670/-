var express = require('express');
var router = express.Router();
let fs = require('fs')
let zstu = null;
router.post("/api/stupost", (req, resp) => {
    let student = fs.readFileSync("./api/students.txt");
    let studentc = fs.readFileSync("./api/students.txt", "utf-8");
    let s = '';
    function cla(ew) {
        let classname = fs.readFileSync("./api/classnames.txt");
        let classnames = JSON.parse(classname);
        for (let item of classnames) {
            if (item.id == ew) {
                return item.classname
            }
        }
    }
    function thname(ew) {
        let teacher = fs.readFileSync("./api/teacher.txt");
        let teachers = JSON.parse(teacher);
        let classname = fs.readFileSync("./api/classnames.txt");
        let classnames = JSON.parse(classname);
        let ser = [];
        for (let items of classnames) {
            if (items.id == ew) {
                for (let item2 of teachers) {
                    if (items.id == item2.cid) {
                        ser[ser.length] = item2.teachername
                    }
                }
            }

        }
        ser = ser.join(',')
        return ser;
    }

    if (student == '' || studentc == '[]' || student == undefined) {
        s = `<tr><td colspan="8">暂无学生数据</td></tr>`
        return resp.send(s)
    }
    let students = JSON.parse(student);
    for (let i = 0; i < students.length; i++) {
        s += `<tr>
              <td>${i + 1}</td>
              <td>${students[i].stu_name}</td>
              <td>${students[i].stu_age}</td>
              <td>${students[i].stu_sex}</td>
              <td>${cla(students[i].classname)}</td>
              <td>${thname(students[i].classname)}</td>
              <td><button onclick="shan(${students[i].id})">删除</button><button onclick="xiugai(${students[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
            </tr>`
    }
    return resp.send(s)
})
router.post("/api/stupostxrtj", (req, resp) => {
    let use = fs.readFileSync("./api/classnames.txt");
    let usec = fs.readFileSync("./api/classnames.txt", "utf-8");
    let s = '';
    if (use == '' || usec == '[]' || use == undefined) {
        s = `<option disabled="disabled">暂无数据</option>`
        return resp.send(s)
    }
    
    let user = JSON.parse(use);
    for (let i = 0; i < user.length; i++) {
        s += `<option value="${user[i].id}">${user[i].classname}</option>`
    }
    return resp.send(s)
})
router.post("/api/stuposttj", (req, resp) => {
    let query = req.body;
    let use = fs.readFileSync("./api/students.txt");
    let usec = fs.readFileSync("./api/students.txt", "utf-8");
    if (usec == '[]'||usec == ''||usec == undefined) {
        query.id = parseInt(query.id)
        query.stu_age = parseInt(query.stu_age)
        query.classname = parseInt(query.classname)
        fs.writeFile("./api/students.txt", `[${JSON.stringify(query)}]`, function () {
            return resp.send("z")
        })
        return
    }
    let user = JSON.parse(use);
    query.stu_age = parseInt(query.stu_age)
    query.classname = parseInt(query.classname)
    query.id = parseInt(user[user.length - 1].id) + 1;
    user[user.length] = query;
    fs.writeFile("./api/students.txt", JSON.stringify(user), function () {
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
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == zstu) {
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
                for (let item2 of teachers) {
                    if (items.id == item2.cid) {
                        ser[ser.length] = item2.teachername
                    }
                }
            }

        }
        ser = ser.join(',')
        return ser;
    }
    for (let i = 0; i < students.length; i++) {
        if (students[i].stu_name.indexOf(query.name) >= 0) {
            ss++
            biao = true;
            s += `<tr>
        <td>${ss}</td>
        <td>${students[i].stu_name}</td>
        <td>${students[i].stu_age}</td>
        <td>${students[i].stu_sex}</td>
        <td>${cla(students[i].classname)}</td>
        <td>${thname(students[i].classname)}</td>
        <td><button onclick="shan(${students[i].id})">删除</button><button onclick="xiugai(${students[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
      </tr>`
        }
    }
    if (biao == false) {
        s += `<tr><td colspan="8">暂无筛选数据</td></tr>`
    }
    return resp.send(s)
})

module.exports = router;
