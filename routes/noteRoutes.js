const router = require('express').Router()
const fs = require('fs')
const { join, parse } = require('path')
const { uid } = require('uid')

let notes = require('../db/db.json')


router.get('/notes', (req, res) => {
  res.json(notes)
})

router.post('/notes', (req, res) => {
  let noteData = {
    title: req.body.title,
    text: req.body.text,
    id: uid()
  }

  notes.push(noteData)
  fs.writeFile(join(__dirname,'..', 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    res.json(noteData)
  })
})

router.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
  fs.writeFile(join(__dirname,'..', 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})


module.exports = router