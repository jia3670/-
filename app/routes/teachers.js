var express = require('express');
var router = express.Router();
let fs = require('fs')
let zhi = null;
router.post("/api/thpost", (req, resp) => {
    let use = fs.readFileSync("./api/teacher.txt");
    let user = JSON.parse(use);
    let s = '';
    if (user == '' || user == [] || user == undefined) {
        s = `<tr><td colspan="5">暂无老师数据</td></tr>`
        return s
    }
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    function xrb(id) {
        for (let j = 0; j < classnames.length; j++) {
            if (classnames[j].id == id) {
                return classnames[j].classname
            }
        }
    }
    for (let i = 0; i < user.length; i++) {
        s += `<tr>
              <td>${i + 1}</td>
              <td>${user[i].teachername}</td>
              <td>${xrb(user[i].cid)}</td>
              <td><button onclick="shan(${user[i].id})">删除</button><button onclick="xiugai(${user[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
              <td></td>
            </tr>`
    }
    return resp.end(s)
})
router.post("/api/thpostxrtj", (req, resp) => {
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
function bancun(cid, id) {
    let classe = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classe);
    for (let i = 0; i < classnames.length; i++) {
        if (cid == classnames[i].id) {
            classnames[i].tid[classnames[i].tid.length == undefined ? 0 : classnames[i].tid.length] = id;
            fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                return
            })
        }
    }
}
function banshan(id) {
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    for (let i = 0; i < classnames.length; i++) {
        for (let j = 0; j < classnames[i].tid.length; j++) {
            if (classnames[i].tid[j] == id) {
                classnames[i].tid.splice(j, 1);
            }
        }
    }
    fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
        return
    })
}
router.post("/api/thposttj", (req, resp) => {
    let query = req.body;
    query.cid = parseInt(query.cid)
    let use = fs.readFileSync("./api/teacher.txt");
    if (use == '' || use == [] || use == undefined) {
        fs.writeFile("./api/teacher.txt", `[${JSON.stringify(query)}]`, function () {
            bancun(query.cid, query.id)
            return resp.send("z")
        })
    }
    let user = JSON.parse(use);
    query.id = parseInt(user[user.length - 1].id) + 1;
    user[user.length] = query;
    fs.writeFile("./api/teacher.txt", JSON.stringify(user), function () {
        bancun(query.cid, query.id)
        return resp.send("z")
    })
})
router.delete("/api/thdeleteshan", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/teacher.txt");
    let user = JSON.parse(use);
    for (let i in user) {
        if (query == user[i].id) {
            user.splice(i, 1);
            banshan(query)
            break
        }
    }
    fs.writeFile("./api/teacher.txt", JSON.stringify(user), function () {
        return resp.send("z")
    })
})
router.put("/api/thputxiugai", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/teacher.txt");
    let user = JSON.parse(use);
    for (let i in user) {
        if (query == user[i].id) {
            zhi = user[i].id;
            let s = {
                cid: user[i].cid,
                teachername: user[i].teachername
            }
            return resp.send(s)
        }
    }
})
router.put("/api/thputxg", (req, resp) => {
    let query = req.body;
    query.cid = parseInt(query.cid)
    let use = fs.readFileSync("./api/teacher.txt");
    let user = JSON.parse(use);
    let classe = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classe);
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == zhi) {
            function bans() {
                for (let i = 0; i < classnames.length; i++) {
                    for (let j = 0; j < classnames[i].tid.length; j++) {
                        if (classnames[i].tid[j] == zhi) {
                            classnames[i].tid.splice(j, 1);
                        }
                    }
                }
                fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                    console.log("删除成功");
                })
            }
            bans()
            function banxiu() {
                for (let j = 0; j < classnames.length; j++) {
                    if (query.cid == classnames[j].id) {
                        classnames[j].tid[(classnames[j].tid.length == undefined || classnames[j].tid.length == [] || classnames[j].tid.length == '') ? 0 : classnames[j].tid.length] = zhi;
                        fs.writeFile("./api/classnames.txt", JSON.stringify(classnames), function () {
                            console.log("修改成功");
                        })
                    }
                }
            }
            banxiu()
            user[i].teachername = query.teachername;
            user[i].cid = query.cid;
        }
    }
    fs.writeFile("./api/teacher.txt", JSON.stringify(user), function () {
        return resp.send("z")
    })
})
router.get("/api/thgetchazhao", (req, resp) => {
    let query = req.query;
    let use = fs.readFileSync("./api/teacher.txt");
    let user = JSON.parse(use);
    let s = '';
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    function xrb(id) {
        for (let j = 0; j < classnames.length; j++) {
            if (classnames[j].id == id) {
                return classnames[j].classname
            }
        }
    }
    let biao = false;
    for (let i = 0; i < user.length; i++) {
        if (user[i].teachername.indexOf(query.name) >= 0) {
            biao = true;
            s += `<tr>
        <td>${i + 1}</td>
        <td>${user[i].teachername}</td>
        <td>${xrb(user[i].cid)}</td>
        <td><button onclick="shan(${user[i].id})">删除</button><button onclick="xiugai(${user[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
        <td></td>
      </tr>`
        }
    }
    if (biao == false) {
        s += `<tr><td colspan="5">暂无筛选数据</td></tr>`
    }
    return resp.send(s)
})

module.exports = router;
