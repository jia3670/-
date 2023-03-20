var express = require('express');
var router = express.Router();
let fs=require('fs')

let zcl = null;
router.post("/api/clpost", (req, resp) => {
    let classname = fs.readFileSync("./api/classnames.txt");
    let classnames = JSON.parse(classname);
    let teacher = fs.readFileSync("./api/teacher.txt");
    let teachers = JSON.parse(teacher);
    let student = fs.readFileSync("./api/students.txt");
    let students = JSON.parse(student);
    let s = '';
    if (classnames == '' || classnames == [] || classnames == undefined) {
      s = `<tr><td colspan="5">暂无教室数据</td></tr>`
      return s
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
    function stuname(ew) {
      let ser = [];
      for (let items of classnames) {
        if (items.id == ew) {
          for (let item2 of items.stuid) {
            for (let item3 of students) {
              if (item2 == item3.id) {
                ser[ser.length] = item3.stu_name
              }
            }
          }
        }
      }
      ser = ser.join(',')
      return ser;
    }
    for (let i = 0; i < classnames.length; i++) {
      s += `<tr>
              <td>${i + 1}</td>
              <td>${classnames[i].classname}</td>
              <td>${thname(classnames[i].id)}</td>
              <td>${stuname(classnames[i].id)}</td>
              <td><button onclick="shan(${classnames[i].id})">删除</button><button onclick="xiugai(${classnames[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
              <td></td>
            </tr>`
    }
    return resp.end(s)
  })
  router.post("/api/clposttj", (req, resp) => {
    let query = req.body;
    query.tid = [];
    let use = fs.readFileSync("./api/classnames.txt");
    if (use == '' || use == [] || use == undefined) {
      fs.writeFile("./api/classnames.txt", `[${JSON.stringify(query)}]`, function () {
        bancun(query.cid, query.id)
        return resp.send("z")
      })
    }
    let user = JSON.parse(use);
    query.id = parseInt(user[user.length - 1].id) + 1;
    user[user.length] = query;
    fs.writeFile("./api/classnames.txt", JSON.stringify(user), function () {
      return resp.send("z")
    })
  })
  router.delete("/api/cldeleteshan", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/classnames.txt");
    let user = JSON.parse(use);
    for (let i in user) {
      if (query == user[i].id) {
        user.splice(i, 1);
        break
      }
    }
    fs.writeFile("./api/classnames.txt", JSON.stringify(user), function () {
      return resp.send("z")
    })
  })
  router.put("/api/clputxiugai", (req, resp) => {
    let query = req.body.id;
    let use = fs.readFileSync("./api/classnames.txt");
    let user = JSON.parse(use);
    for (let i in user) {
      if (query == user[i].id) {
        zcl = user[i].id;
        let s = {
          classname: user[i].classname
        }
        return resp.send(s)
      }
    }
  })
  router.put("/api/clputxg", (req, resp) => {
    let query = req.body;
    let use = fs.readFileSync("./api/classnames.txt");
    let user = JSON.parse(use);
    for (let i = 0; i < user.length; i++) {
      if (user[i].id == zcl) {
        user[i].classname = query.classname;
        break
      }
    }
    fs.writeFile("./api/classnames.txt", JSON.stringify(user), function () {
      return resp.send("z")
    })
  })
  router.get("/api/clgetchazhao", (req, resp) => {
    let query = req.query;
    let use = fs.readFileSync("./api/classnames.txt");
    let user = JSON.parse(use);
    let teacher = fs.readFileSync("./api/teacher.txt");
    let teachers = JSON.parse(teacher);
    let student = fs.readFileSync("./api/students.txt");
    let students = JSON.parse(student);
    function thname(ew) {
      let ser = [];
      for (let items of user) {
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
    function stuname(ew) {
      let ser = [];
      for (let items of user) {
        if (items.id == ew) {
          for (let item2 of items.stuid) {
            for (let item3 of students) {
              if (item2 == item3.id) {
                ser[ser.length] = item3.stu_name
              }
            }
          }
        }
      }
      ser = ser.join(',')
      return ser;
    }
    let s = '';
    let biao = false;
    let ss = 0
    for (let i = 0; i < user.length; i++) {
      if (user[i].classname.indexOf(query.name) >= 0) {
        biao = true;
        s += `<tr>
        <td>${ss + 1}</td>
        <td>${user[i].classname}</td>
        <td>${thname(user[i].id)}</td>
        <td>${stuname(user[i].id)}</td>
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
