const router = require('express').Router()
const fs = require('fs')
const { join, parse } = require('path')
const { uid } = require('uid')

let notes = require('../db/db.json')

// allows you to get the notes
router.get('/notes', (req, res) => {
  res.json(notes)
})

// allows you to post notes
router.post('/notes', (req, res) => {
  let noteData = {
    title: req.body.title,
    text: req.body.text,
    id: uid()
  }

  // pushes the notes to save to the database
  notes.push(noteData)
  fs.writeFile(join(__dirname,'..', 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    res.json(noteData)
  })
})

// deletes the notes from the database
router.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
  fs.writeFile(join(__dirname,'..', 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})


module.exports = router