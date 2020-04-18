const express = require('express')
const router = express.Router()

const assetService = require('../services/assets.service')
const getAsset = require('../middleware/getAsset')

const multer = require('multer')(assetService.getOptions())

router.get('/', assetService.getAll)
// router.get('/', getAsset, assetService.getOne)
router.post('/', assetService.createOne)
router.post('/upload', multer.any(), assetService.uploadFile)

module.exports = router