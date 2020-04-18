const Pothole = require('../models/Pothole')

module.exports = async function getPothole (req, res, next) {
    try {
        pothole = await Pothole.findById(req.params.id)
        if (pothole == null) {
            return res.status(404).json({ message: 'Pothole Not Found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.pothole = pothole
    next()
}