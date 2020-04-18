const express = require('express')
const router = express.Router()

const archiveService = require('../services/archives.service')

const getArchive = require('../middleware/getArchive')

router.get('/', archiveService.getAll)
router.get('/:id', getArchive, archiveService.getOne)
router.delete('/:id', getArchive, archiveService.deleteFile)

module.exports = router