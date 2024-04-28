const express = require("express");
const router = express.Router();

const UploadControllers  = require ('../controllers/UploadControllers');
const upload = require('../middleware/uploadMiddleware');

router.get('/', UploadControllers.index)
router.post('/show', UploadControllers.show);
router.post('/store', upload.single('file'), UploadControllers.store);
router.post('/update', UploadControllers.update);
router.post('/delete', UploadControllers.destroy);

router.post('/upload', upload.single('file'),uploadFile);

module.exports = router;