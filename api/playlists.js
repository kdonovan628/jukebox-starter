const express = require(`express`); 
const router = express.Router(); 
const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

router.get(`/`, async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (error) {
    next(error);
  }
});

router.post(`/`, async (req, res, next) => {
  const { name, description, ownerId, trackIds } = req.body;
  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description, 
        owner: { connect: { id: ownerId } }, 
        tracks: { connect: trackIds.map((id) => ({ id })) },
      },
    });
    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
});

router.get(`/:id`, async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: parseInt(id) },
      include: { tracks: true },
    });
    if (!playlist) return res.status(404).json({ error: `Playlist not found` });
    res.json(playlist);
  } catch (error) {
    next(error);
  }
});

module.exports = router;