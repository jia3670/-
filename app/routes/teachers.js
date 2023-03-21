var express = require('express');
var router = express.Router();
let fs = require('fs')
let zhi = null;
router.post("/api/thpost", (req, resp) => {
    let use = fs.readFileSync("./api/teacher.txt");
    let usec = fs.readFileSync("./api/teacher.txt", "utf-8");
    let s = '';
    if (use== '' || usec == '[]' || use == undefined) {
        s = `<tr><td colspan="5">暂无老师数据</td></tr>`
        return resp.end(s)
    }
    let user = JSON.parse(use);
    let classname = fs.readFileSync("./api/classnames.txt","utf-8");
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
            </tr>`
    }
    return resp.end(s)
})
router.post("/api/thpostxrtj", (req, resp) => {
    let use = fs.readFileSync("./api/classnames.txt");
    let usec = fs.readFileSync("./api/classnames.txt", "utf-8");
    let s = '';
    if (use == '' || usec == '[]' || use == undefined) {
        s = `<option disabled="disabled">暂无数据</option>`
        return resp.end(s)
    }
    
    let user = JSON.parse(use);
    for (let i = 0; i < user.length; i++) {
        s += `<option value="${user[i].id}">${user[i].classname}</option>`
    }
    return resp.send(s)
})


router.post("/api/thposttj", (req, resp) => {
    let query = req.body;
    let use = fs.readFileSync("./api/teacher.txt");
    let usec = fs.readFileSync("./api/teacher.txt", "utf-8");
    if (usec == '[]'||usec == ''||usec == undefined) {
        query.id = parseInt(query.id)
        query.cid = parseInt(query.cid)
        fs.writeFile("./api/teacher.txt", `[${JSON.stringify(query)}]`, function () {
             resp.end("z")
        })
        return
    }
    let user = JSON.parse(use);
    query.id = parseInt(user[user.length - 1].id) + 1;
    user[user.length] = query;
    fs.writeFile("./api/teacher.txt", JSON.stringify(user), function () {
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
    let ss=0;
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
            ss++
            s += `<tr>
        <td>${ss}</td>
        <td>${user[i].teachername}</td>
        <td>${xrb(user[i].cid)}</td>
        <td><button onclick="shan(${user[i].id})">删除</button><button onclick="xiugai(${user[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
      </tr>`
        }
    }
    if (biao == false) {
        s += `<tr><td colspan="5">暂无筛选数据</td></tr>`
    }
    return resp.send(s)
})

module.exports = router;
