var express = require('express');
var router = express.Router();
let fs = require('fs')

let zcl = null;
router.post("/api/clpost", (req, resp) => {
  let classname = fs.readFileSync("./api/classnames.txt");
  let classnamec = fs.readFileSync("./api/classnames.txt", "utf-8");
  let s = '';
  if (classname == '' || classnamec == '[]' || classname == undefined) {
    s = `<tr><td colspan="5">暂无教室数据</td></tr>`
    return resp.end(s)
  }

  let classnames = JSON.parse(classname);
  for (let i = 0; i < classnames.length; i++) {
    s += `<tr>
              <td>${i + 1}</td>
              <td>${classnames[i].classname}</td>
              <td><button onclick="shan(${classnames[i].id})">删除</button><button onclick="xiugai(${classnames[i].id})" data-target="#myModal2" data-toggle="modal">修改</button></td>
            </tr>`
  }
  return resp.end(s)
})
router.post("/api/clposttj", (req, resp) => {
  let query = req.body;
  let use = fs.readFileSync("./api/classnames.txt");
  let usec = fs.readFileSync("./api/classnames.txt", "utf-8");
  if (use == '' || usec == '[]' || use == undefined) {
    query.id = parseInt(query.id)
    fs.writeFile("./api/classnames.txt", `[${JSON.stringify(query)}]`, function () {
      resp.send("z")
    })
    return
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
  let student = fs.readFileSync("./api/students.txt", "utf-8");
  let teacher = fs.readFileSync("./api/teacher.txt", "utf-8");
  if (student == '[]' || student == '' || student == undefined) {
    if (teacher == '[]' || teacher == '' || teacher == undefined) {
      for (let i in user) {
        if (query == user[i].id) {
          user.splice(i, 1);
          break
        }
      }
      fs.writeFile("./api/classnames.txt", JSON.stringify(user), function () {
        resp.send("z")
      })
      return
    }
  }
  let students = JSON.parse(student);
  let teachers = JSON.parse(teacher);
  for (let item of students) {
    if (item.classname == query) {
      return resp.send("x")
    }
  }
  for (let item2 of teachers) {
    if (item2.cid == query) {
      return resp.send("t")
    }
  }
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
  let s = '';
  let biao = false;
  let ss = 0
  for (let i = 0; i < user.length; i++) {
    if (user[i].classname.indexOf(query.name) >= 0) {
      biao = true;
      ss++
      s += `<tr>
        <td>${ss}</td>
        <td>${user[i].classname}</td>
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
