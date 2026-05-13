const File = require('../models/File');
const Room = require('../models/Room');

async function ensureRoom(roomId) {
  if (!roomId || typeof roomId !== 'string') return;
  await Room.findOneAndUpdate(
    { roomId },
    { $setOnInsert: { roomId, name: roomId } },
    { upsert: true },
  );
}

async function listFiles(req, res, next) {
  try {
    const { roomId } = req.query;
    if (!roomId) {
      return res.status(400).json({ message: 'roomId query required' });
    }
    const files = await File.find({ roomId }).sort({ updatedAt: -1 }).lean();
    res.json({ files });
  } catch (err) {
    next(err);
  }
}

async function createFile(req, res, next) {
  try {
    const { roomId, filename, language, content } = req.body;
    if (!roomId || !filename) {
      return res.status(400).json({ message: 'roomId and filename required' });
    }
    await ensureRoom(roomId);
    const file = await File.create({
      roomId,
      filename: String(filename).trim(),
      language: language || 'javascript',
      content: content ?? '',
    });
    res.status(201).json({ file });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'File already exists in this room' });
    }
    next(err);
  }
}

async function updateFile(req, res, next) {
  try {
    const { id } = req.params;
    const { filename, language, content } = req.body;
    const update = {};
    if (filename !== undefined) update.filename = String(filename).trim();
    if (language !== undefined) update.language = language;
    if (content !== undefined) update.content = content;

    const file = await File.findByIdAndUpdate(id, update, { new: true });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json({ file });
  } catch (err) {
    next(err);
  }
}

async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listFiles, createFile, updateFile, deleteFile };
