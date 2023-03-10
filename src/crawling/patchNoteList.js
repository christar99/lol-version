const axios = require("axios");

const getVersionApi = async () => {
    try {
        return await axios.get(
            "http://ddragon.leagueoflegends.com/api/versions.json"
        );
    } catch (error) {
        console.log(error);
    }
};

const getPatchNoteDetail = async (version) => {
    try {
        return await axios.get(
            `http://www.leagueoflegends.com/page-data/ko-kr/news/game-updates/patch-${version}-notes/page-data.json`,
            {
                headers: { "Accept-Encoding": "gzip,deflate,compress" }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const parsing = async (idx) => {
    const versionApi = await getVersionApi();
    const versionSet = new Set();
    versionApi.data.forEach((version) => {
        const versionDetail = version.split(".");
        if (versionDetail[0] >= 10) {
            versionSet.add(versionDetail[0] + "-" + versionDetail[1]);
        }
    });
    const versionList = [...versionSet];

    let promises = [];
    let versions = [];
    for (let i = Number(idx) * 6; i < Number(idx) * 6 + 6; i++) {
        if (i < versionList.length) {
            const update = getPatchNoteDetail(versionList[i]);
            promises.push(update);
            versions.push(versionList[i]);
        }
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
            totalElements: versionList.length
        };
    });

    return result;
};

module.exports = parsing;
