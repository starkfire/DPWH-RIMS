const fs = require('fs')
const path = require('path')

const Archive = require('../models/Archive')

module.exports = {
    getAll: async (req, res) => {
        try{
            const archives = await Archive.find()
            res.json(archives)
            console.log('Success: Archives / GET ALL')
        } catch {
            res.status(500).json({ message: 'Failed: Archives / GET ALL' })
        }
    },
    getOne: (req, res) => {
        try{
            let fileLocation = path.join(__dirname, '..', 'uploads', res.archive.name)
            res.download(fileLocation)
            console.log(`Success: Archives / GET ONE (${res.archive.name})`)
        } catch {
            res.status(404).end()
        }
    },
    deleteFile: async (req, res) => {
        try {
            await res.archive.remove()
            let fileLocation = path.join(__dirname, '..', 'uploads', res.archive.name)
            fs.unlink(fileLocation, (err) => {
                if(err) return next(err)
            })

            res.json({ message: `Success: Archives / DELETE (${res.archive.name})` })
        }catch(err){
            res.status(500).json({ message: err.message })
        }
    }
}