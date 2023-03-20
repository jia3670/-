var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let cors = require('cors');
let fs = require("fs")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors())
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
let zhi = null;
let zcl = null;
let zstu = null;
function quchu(ew) {
  let arr = [];
  arr = ew.split('')
  let arr2 = []
  for (let item of arr) {
    if (item != "," && item != "[" && item != "]") {
      arr2.push(item)
    }
  }
  return arr2
}
app.post("/api/thpost", (req, resp) => {
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
app.post("/api/thpostxrtj", (req, resp) => {
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
app.post("/api/thposttj", (req, resp) => {
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
app.delete("/api/thdeleteshan", (req, resp) => {
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
app.put("/api/thputxiugai", (req, resp) => {
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
app.put("/api/thputxg", (req, resp) => {
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
app.get("/api/thgetchazhao", (req, resp) => {
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
app.post("/api/clpost", (req, resp) => {
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
app.post("/api/clposttj", (req, resp) => {
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
app.delete("/api/cldeleteshan", (req, resp) => {
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
app.put("/api/clputxiugai", (req, resp) => {
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
app.put("/api/clputxg", (req, resp) => {
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
app.get("/api/clgetchazhao", (req, resp) => {
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
app.post("/api/stupost", (req, resp) => {
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
app.post("/api/stupostxrtj", (req, resp) => {
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
app.post("/api/stuposttj", (req, resp) => {
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
app.delete("/api/studeleteshan", (req, resp) => {
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
app.put("/api/stuputxiugai", (req, resp) => {
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
app.put("/api/stuputxg", (req, resp) => {
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
app.get("/api/stugetchazhao", (req, resp) => {
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
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
