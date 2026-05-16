const express = require('express');
const auth = require('../middleware/auth');
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  summarizeNote,
  summarizeText,
  suggestTitle,
} = require('../controllers/noteController');

const router = express.Router();
router.use(auth);

router.get('/', getNotes);
router.post('/suggest-title', suggestTitle);
router.post('/summarize', summarizeText);
router.post('/:id/summary', summarizeNote);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
