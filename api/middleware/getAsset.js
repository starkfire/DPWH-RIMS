const Asset = require('../models/Asset')

module.exports = async function getAsset(req, res, next) {
    try {
        asset = await Asset.findById(req.params.id)
        if(asset == null) {
            return res.status(404).json({ message: 'Asset not found' })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.asset = asset
    next()
}