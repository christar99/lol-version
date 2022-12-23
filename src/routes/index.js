const express = require("express");
const router = express.Router();

const patchNoteList = require("./patchNoteList");

/* GET home page. */
router.get("/", (req, res) => {
    res.render("");
});

router.use("/patchNoteList", patchNoteList);

module.exports = router;
