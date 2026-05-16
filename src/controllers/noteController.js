const Note = require('../models/Note');
const { createSummary, createTitle } = require('../utils/ai');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ owner: req.user.id }).sort({ updatedAt: -1 });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content, tags, metadata } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const note = await Note.create({
    owner: req.user.id,
    title,
    content,
    tags: Array.isArray(tags) ? tags : [],
    metadata: metadata || {},
  });

  res.status(201).json(note);
};

exports.getNoteById = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
};

exports.updateNote = async (req, res) => {
  const fields = ['title', 'content', 'tags', 'metadata'];
  const updates = {};

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    { $set: updates },
    { new: true }
  );

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json({ message: 'Note deleted' });
};

exports.suggestTitle = async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ message: 'Note content is required' });
  }

  const title = await createTitle(content.trim());
  res.json({ title });
};

exports.summarizeText = async (req, res) => {
  const { title = '', content } = req.body;
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ message: 'Note content is required' });
  }

  const summary = await createSummary(title?.toString().trim() || 'Draft note', content.trim());
  res.json({ summary });
};

exports.summarizeNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const summary = await createSummary(note.title, note.content);
  res.json({ noteId: note._id, summary });
};
