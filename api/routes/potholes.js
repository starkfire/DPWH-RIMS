const express = require('express')
const router = express.Router()

// Middleware
const getPothole = require('../middleware/getPothole')

// Service
const potholeService = require('../services/potholes.service')

// Routes
router.get('/', potholeService.getAll)
router.get('/:id', getPothole, potholeService.getOne)
router.post('/', potholeService.createOne)
router.delete('/:id', getPothole, potholeService.deleteItem)

module.exports = router