const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/movies', Controller.getAllMovies)
router.get('/movies/:id', Controller.getOneMovie)
router.post('/movies', Controller.postMovie)
router.delete('/movies/:id', Controller.deleteOneMovie)

module.exports = router