var express = require('express');
var router = express.Router();
let fs = require('fs')
//注册后台
router.post("/api/addById2", function (req, resp) {
    let query = req.body;
    let use = fs.readFileSync("./api/register.txt");
    let usec = fs.readFileSync("./api/register.txt", "utf-8");
    if (usec == '[]' || usec == '' || usec == undefined) {
        query.id = 1;
        query.quanxian = parseInt(query.quanxian);
        fs.writeFile("./api/register.txt", `[${JSON.stringify(query)}]`, function () {
            resp.send("z")
        })
        return
    }
    let user = JSON.parse(use);
    for (let item of user) {
        if (item.user == query.user) {
            return resp.send("c")
        }
    }
    query.id = user[user.length - 1].id + 1;
    query.quanxian = parseInt(query.quanxian);
    fs.writeFile("./api/register.txt", `[${JSON.stringify(query)}]`, function () {
        return resp.send("z")
    })
})
//登录
router.post("/api/addById3", function (req, resp) {
    let query = req.body;
    let use = fs.readFileSync("./api/register.txt");
    let usec = fs.readFileSync("./api/register.txt", "utf-8");
    if (usec == '[]' || usec == '' || usec == undefined) {
        return resp.send("ccw")
    }
    let user = JSON.parse(use)
    let bool = false;

    for (let i = 0; i < user.length; i++) {
        if (user[i].user == query.user && user[i].password == query.password) {
            if (user[i].quanxian == 0) {
                bool = true;
                return resp.send("gl")
            } else {
                bool = true;
                return resp.send("yh")
            }
        }
    }
    if (bool == false) {
        return resp.send(true)
    }
})

module.exports = router;