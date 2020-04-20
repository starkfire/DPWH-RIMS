const Pothole = require('../models/Pothole')

module.exports = {
    getAll: async (req, res) => {
        try {
            const potholes = await Pothole.find()

            console.log('Success: GET / Potholes')
            res.json(potholes)
        } catch {
            res.status(500).json({ message: err.message })
        }
    },
    getOne: (req, res) => {
        res.json(res.pothole)
    },
    createOne: async (req, res) => {
        const pothole = new Pothole({
            type: req.body.type,
            dimensions: [new Number(req.body.length), new Number(req.body.width), new Number(req.body.depth)],
            address: req.body.address,
            location: [new Number(req.body.lat), new Number(req.body.lon)]
        })

        try {
            const newPothole = await pothole.save()

            console.log('Success: POST / Potholes')
            res.status(200).json(newPothole)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    deleteItem: async (req, res) => {
        try {
            await res.pothole.remove()
            res.json({ message: 'Success: DELETE / Pothole' })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}