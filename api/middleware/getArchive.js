const Archive = require('../models/Archive')

module.exports = async function getArchive(req, res, next){
    try {
        archive = await Archive.findById(req.params.id)
        if(archive == null) {
            return res.status(404).json({ message: 'Archive not found' })
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.archive = archive
    next()
}