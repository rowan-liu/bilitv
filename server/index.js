const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'web')));

app.get('/api/channels', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'data', 'channels.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read channels' });
    res.json(JSON.parse(data));
  });
});

app.get('/api/channel/:id', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'data', 'channels.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read channels' });
    const channels = JSON.parse(data);
    const channel = channels.find(c => c.id === req.params.id);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    res.json(channel);
  });
});

app.listen(PORT, () => {
  console.log(`BiliTV server running at http://localhost:${PORT}`);
});
