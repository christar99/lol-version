const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const patchNoteList = require("../crawling/patchNoteList");

router.get("/:year/:idx", async (req, res) => {
    const year = req.params.year;
    const idx = req.params.idx;
    const list = await patchNoteList(year, idx);
    res.send({ list });
});

module.exports = router;
