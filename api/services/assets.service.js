const multer = require('multer')
const btoa = require('btoa')
const async = require('async')

const Archive = require('../models/Archive')
const Asset = require('../models/Asset')

const archiveConfig = {
    supportedMimes: {
        'text/csv': 'csv',
        'application/vnd.ms-excel': 'csv'
    },
    uploadsFolder: 'uploads'
}

module.exports = {
    getAll: async (req, res) => {
        try {
            const assets = await Asset.find()
            res.json(assets)
            console.log('Success: Assets / GET ALL')
        } catch(err) {
            res.status(500).json({ message: 'Failed: Assets / GET ALL' })
        }
    },
    createOne: async (req, res) => {
        const asset = new Asset({
            type: req.body.type,
            value: req.body.value,
            address: req.body.address,
            location: [new Number(req.body.lat), new Number(req.body.lon)],
            length: req.body.length
        })

        try {
            const newAsset = await asset.save()

            console.log('Success: POST / Asset')
            res.status(200).json(newAsset)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    uploadFile: (req, res) => {
        async.each(req.files, (file, callback) => {
            let archive = new Archive({ name: file.filename })

            try {
                archive.encodedName = btoa(archive._id)
                archive.save()

                console.log(`Success: Assets / POST (${file.filename})`)
                callback()
            } catch {
                res.status(400).json({ message: 'Failed: Assets / POST' })
            }
        }, (err) => {
            if(err) return res.status(400).end()
            return res.status(200).end()
        })
    },
    getOptions: () => {
        return {
            storage: multer.diskStorage({
                destination: archiveConfig.uploadsFolder,
                filename: (req, file, cb) => {
                    let ext = archiveConfig.supportedMimes[file.mimetype]
                    let originalname = file.originalname.split('.')[0]
                    let filename = originalname + '-' + (new Date()).getMilliseconds() + '.' + ext
                    cb(null, filename)
                }
            }),
            fileFilter: (req, file, cb) => {
                let ext = archiveConfig.supportedMimes[file.mimetype]

                !ext ? cb(new Error('Invalid Format')) : cb(null, true)
            }
        }
    }
}