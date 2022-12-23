const patchNoteList = require("./src/crawling/patchNoteList");

const a = async () => {
    const q = await patchNoteList;

    return q;
};

a();
