// Lightweight Bilibili metadata helper (stub)
// For MVP we prefer embedding the official player; this module can be extended
// later to fetch metadata or use yt-dlp for direct streams.

module.exports = {
  async fetchMetadata(bvid) {
    // TODO: implement real metadata fetching via public API or scraping
    return { bvid, title: 'Unknown title', uploader: 'Unknown' };
  }
};
