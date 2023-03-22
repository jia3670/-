let express = require("express");
let multer = require("multer");
let router = express.Router();
let fs = require("fs");
let file = multer({
    dest: __dirname
})

router.post("/api/upload", file.single("fileName"), (req, resp) => {
    let fileCont = req.file;
    fs.renameSync(fileCont.path, "./public/images/" + fileCont.originalname);
    resp.send("http://localhost:3000/images/" + fileCont.originalname)
})
module.exports = router;