
const {getAllEntries,getEntry,createEntry,updateEntry,deleteEntry} = require('../controllers/entryController')
const authenticationMiddleware = require('../middleware/authentication')
const {uploadImage} = require('../controllers/uploadsController')
const express = require('express')
const router = express.Router()

router.route('/').get(getAllEntries).post(authenticationMiddleware,createEntry)
router.route('/uploads').post(uploadImage)
router.route('/:id').get(authenticationMiddleware,getEntry).delete(authenticationMiddleware,deleteEntry).patch(authenticationMiddleware,updateEntry)
module.exports = router