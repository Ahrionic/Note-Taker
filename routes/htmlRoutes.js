const router = require('express').Router()
const { join } = require('path')

//route to notes in public
router.get('/notes', (req, res) => {
  res.sendFile(join(__dirname,'..', 'public', 'notes.html'))
})

//route to the index in public
router.get('*', (req, res) => {
  res.sendFile(join(__dirname,'..', 'public', 'index.html'))
})


module.exports = router