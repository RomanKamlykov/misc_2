const router = require('express').Router();
const Note = require('./models/Note');

router.get('/home', async (req, res) => {
  try {
    // get child notes
    const childNotes = await Note.find({ parentNodeId: '' }).sort({ title: 1 });
    // get recent notes
    const recentNotes = await Note.find().sort({ updatedAt: -1 }).limit(10);
    // render a page
    res.json({ childNotes, recentNotes });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/note/:id', async (req, res) => {
  // const { id } = req.query;
  const { id } = req.params;
  try {
    // get a note
    const note = await Note.findById(id);
    // get child notes
    const childNotes = await Note.find({ parentNodeId: note.nodeId }).sort({ title: 1 });
    // get the path
    const path = []; let loopLimit = 10;
    const allNotes = await Note.find();
    path.unshift(note);
    while (Boolean(loopLimit) && (path[0].parentNodeId)) {
      path.unshift(allNotes.find((note) => String(note.nodeId) === path[0].parentNodeId));
      loopLimit -= 1;
    }
    // render a page
    res.json({ note, path, childNotes });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/edit/:id', async (req, res) => {
  // const { id } = req.query;
  const { id } = req.params;
  try {
    // find a note
    const note = await Note.findById(id);
    res.json({ note });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
