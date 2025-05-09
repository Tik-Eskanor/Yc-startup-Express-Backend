const express = require('express')
const router = express.Router()
const {createStartup,getStartups,getStartup,search,updateViews} = require('../Controllers/startup-controller')
const authMiddleware = require("../Middleware/auth-middleware")

router.post('/create',authMiddleware,createStartup)
router.get('/all',getStartups)
router.get('/search',search)
router.get('/:id',getStartup)
router.patch('/views/:id',updateViews)

module.exports = router