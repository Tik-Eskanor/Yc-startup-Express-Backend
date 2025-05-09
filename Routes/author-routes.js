const express = require('express')
const router = express.Router()
const {createAuthor,getAuthor,getAuthorStartups} = require('../Controllers/author-controller')

router.post('/create',createAuthor)
router.get('/:id',getAuthor)
router.get('/startups/:id',getAuthorStartups)

module.exports = router