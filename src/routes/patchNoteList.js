const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const patchNoteList = require("../crawling/patchNoteList");

router.get("/:idx", async (req, res) => {
    const idx = req.params.idx;
    const list = await patchNoteList(idx);
    res.send({ list });
});

module.exports = router;
