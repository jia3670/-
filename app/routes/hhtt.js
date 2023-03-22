let express = require("express")
let router = express.Router()
let jwt = require("jsonwebtoken")
router.get("/api/hhtt", function (req, res, next) {
    let token = req.headers.authorization
    let data
    jwt.verify(token, "tokenKey", (err, decoded) => {
        if (err == null) {
            data = { success: true, msg: "成功" }
        } else {
            data = { success: false, msg: "loin" }
        }
    })
    res.send(data)
})
module.exports = router;