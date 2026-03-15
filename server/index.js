const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'web')));

// Simple SSE implementation for remote control
const sseClients = [];
function sendSseEvent(event) {
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  sseClients.forEach(res => res.write(payload));
}

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.flushHeaders && res.flushHeaders();
  // send a comment to avoid some proxies closing the connection
  res.write(':ok\n\n');
  sseClients.push(res);
  req.on('close', () => {
    const i = sseClients.indexOf(res);
    if (i !== -1) sseClients.splice(i, 1);
  });
});

// control endpoint to broadcast events to connected clients
app.post('/api/control', (req, res) => {
  const body = req.body;
  if (!body) return res.status(400).json({ error: 'missing body' });
  sendSseEvent({ type: 'control', payload: body });
  res.json({ ok: true });
});

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
