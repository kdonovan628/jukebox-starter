const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./api/users');
const playlistsRouter = require('./api/playlists');
const tracksRouter = require('./api/tracks');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/playlists', playlistsRouter);
app.use('/api/tracks', tracksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});