// Bilibili metadata helper
// Uses public Bilibili x/web-interface/view API to fetch basic metadata
module.exports = {
  async fetchMetadata(bvid) {
    if (!bvid) throw new Error('missing bvid');
    const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`;
    try {
      const r = await fetch(apiUrl, { headers: { 'User-Agent': 'BiliTV/1.0' } });
      const json = await r.json();
      if (json && json.code === 0 && json.data) {
        const d = json.data;
        return {
          bvid,
          title: d.title,
          owner: d.owner ? d.owner.name : (d.uploader || ''),
          pic: d.pic,
          stat: d.stat || {}
        };
      } else {
        throw new Error('bad upstream: ' + JSON.stringify(json));
      }
    } catch (err) {
      throw err;
    }
  }
};
