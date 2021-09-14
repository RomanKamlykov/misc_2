// const router = require('express').Router();
// const marked = require('marked');
// const titleMaker = require('./utils/titleMaker');
// const Note = require('./models/Note');

// ----- home page -----
router.get('/home', async (req, res) => {
  const { name: author } = req.user;

  try {
    // get child notes
    const childNotes = await Note.find({ author, parentNodeId: '' }).sort({ title: 'asc' });
    // get recent notes
    const recentNotes = await Note.find({ author }).sort({ updatedAt: 'desc' }).limit(10);
    // render the page
    res.render('home.ejs', { childNotes, recentNotes });
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});
router.post('/home', async (req, res) => {
  const { parentNodeId } = req.body;
  const { name: author } = req.user;

  // create a new note
  const note = new Note({
    author,
    parentNodeId,
  });
  try {
    // save the note
    const { _id: createdNoteId } = await note.save();
    // redirect to created note
    res.status(201).redirect(`/view?id=${createdNoteId}`);
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

// ----- search page -----
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const { name: author } = req.user;

  try {
    // const notes = await Note.find({ author, markdown: { $regex: `.*${query}.*`, $options: 'i' } }).sort({ updatedAt: 'desc' });
    const notes = await Note.find({ author, markdown: { $regex: query, $options: 'i' } }).sort({ updatedAt: 'desc' });
    // render the page
    res.render('search.ejs', { query, notes });
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

// ----- view page -----
router.get('/view', async (req, res) => {
  const { id } = req.query;
  const { name: author } = req.user;

  try {
    // get the note
    const note = await Note.findOne({ author, _id:id });
    // make the html
    const html = marked(note.markdown);
    // get child notes
    const childNotes = await Note.find({ author, parentNodeId: note.nodeId }).sort({ title: 'asc' });
    // get the path
    const path = []; let loopLimit = 50;
    const allNotes = await Note.find({ author });
    path.unshift(note);
    while ((path[0].parentNodeId != '') && Boolean(loopLimit)) {
      path.unshift(allNotes.find((note) => String(note.nodeId) === path[0].parentNodeId));
      loopLimit -= 1;
    }
    // render the page
    res.render('view.ejs', { note, html, childNotes, path });
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});
router.post('/view', async (req, res) => {
  const { parentNodeId } = req.body;
  const { name: author } = req.user;

  // create a new note
  const note = new Note({
    author,
    parentNodeId,
  });
  try {
    // save the note
    const { _id: createdNoteId } = await note.save();
    // redirect to created note
    res.status(201).redirect(`/view?id=${createdNoteId}`);
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

// ----- edit page -----
router.get('/edit', async (req, res) => {
  const { id } = req.query;
  const { name: author } = req.user;

  try {
    // find a note
    const note = await Note.findOne({ author, _id:id });
    // render the page
    res.render('edit.ejs', { note });
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});
router.post('/edit', async (req, res) => {
  const { id } = req.body;
  const { markdown } = req.body;
  const { name: author } = req.user;
  const update = { $set: { markdown, title: titleMaker(markdown), updatedAt: Date.now() } };

  try {
    // update the note
    await Note.findOneAndUpdate({ author, _id:id }, update);
    // redirect to the page
    res.redirect(`/edit?id=${id}`);
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

// ----- move page -----
router.get('/move', (req, res) => {
  const { id } = req.query;
  res.render('move.ejs', { id });
});
router.post('/move', async (req, res) => {
  const { id } = req.body;
  const { parentId } = req.body;
  const { name: author } = req.user;
  let currentNote = {};
  let parentNote = {};

  // ----- checks -----
  try {
    currentNote = await Note.findOne({ author, _id: id });
    parentNote = await Note.findOne({ author, _id: parentId });
  } catch (error) {
    return res.status(400).render('error.ejs', { message: "The passed note ID is invalid!" });;
  }
  // check if a parent note exist
  if (!parentNote) {
    // return res.status(400).redirect(`/note?id=${id}`);
    return res.status(400).render('error.ejs', { message: "The passed note ID doesn't exist!" });
  }
  // check if a current note ID and a parent note ID are the same
  if (currentNote.id === parentNote.id) {
    // return res.status(400).redirect(`/note?id=${id}`);
    return res.status(400).render('error.ejs', { message: "The passed note ID is equal to the current note ID!" });
  }
  // check if the path is valid
  let controlNote = parentNote; let loopLimit = 50;
  const allNotes = await Note.find({ author });
  while ((controlNote.parentNodeId != '') && Boolean(loopLimit)) {
    controlNote = allNotes.find((el) => el.nodeId === controlNote.parentNodeId);
    loopLimit -= 1;
    if (controlNote.id === currentNote.id) {
      return res.status(400).render('error.ejs', { message: "The passed note ID is a child to the current note ID!" });
    }
  }

  // ----- action -----
  try {
    const update = { $set: { parentNodeId: parentNote.nodeId, updatedAt: Date.now() } };
    await Note.findOneAndUpdate({ author, _id:id }, update);
    res.status(200).redirect(`/view?id=${id}`);
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

// ----- delete page -----
router.get('/delete', (req, res) => {
  const { id } = req.query;
  res.render('delete.ejs', { id });
});
router.post('/delete', async (req, res) => {
  const { id } = req.body;
  const { name: author } = req.user;

  try {
    // get the note
    const note = await Note.findOne({ author, _id:id });
    // check if there is a child note
    const childNote = await Note.findOne({ author, parentNodeId: note.nodeId });
    if (childNote) {
      return res.status(400).render('error.ejs', { message: "The note has a child note!" });;
    }
    // delete the note
    await Note.findOneAndDelete({ author, _id:id });
    // find a parent note
    const parentNote = await Note.findOne({ author, nodeId: note.parentNodeId });
    // redirect to the parent note
    if(parentNote) {
      res.status(200).redirect(`/view?id=${parentNote._id}`);
    } else {
      res.status(200).redirect('/home');
    }
  } catch (error) {
    res.status(500).render('error.ejs', { message: "Something went wrong!" });
  }
});

module.exports = router;
