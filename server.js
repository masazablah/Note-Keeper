const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/notes', { useNewUrlParser: true, useUnifiedTopology: true });

const Note = mongoose.model('Note', {
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
