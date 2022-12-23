const axios = require("axios");

const getVersionApi = async () => {
    try {
        return await axios.get(
            "https://ddragon.leagueoflegends.com/api/versions.json"
        );
    } catch (err) {
        console.log(err);
    }
};

const getPatchNoteDetail = async (version) => {
    try {
        return await axios.get(
            `https://www.leagueoflegends.com/page-data/ko-kr/news/game-updates/patch-${version}-notes/page-data.json`
        );
    } catch (err) {
        console.log(err);
    }
};

const parsing = async (year, idx) => {
    const versionApi = await getVersionApi();
    const lastVersion = versionApi.data[0].split(".");
    const updateNumber = Number(lastVersion[1]) - 6 * Number(idx);
    let promises = [];
    let versions = [];
    for (let i = Number(updateNumber); i > Number(updateNumber) - 6; i--) {
        if (i === 0) {
            break;
        }
        const version = `${Number(year) - 2010}-${i}`;
        const update = getPatchNoteDetail(version);
        versions.push(version);
        promises.push(update);
    }

    let result = await Promise.all(promises);
    result = result.map((update, index) => {
        const banner = update.data.result.data.all.nodes[0];
        return {
            title: banner.title,
            imgURL: banner.banner.url,
            author: banner.author.map((author) => author.title),
            date: banner.date,
            version: versions[index],
        };
    });
    return result;
};

module.exports = parsing;
