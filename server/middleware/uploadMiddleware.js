const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage ({
    designation: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.nom() = ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.minetype == "image/png" ||
            file.minetype == "image/jpg" ||
            file.minetype == "image/jpeg"||
            file.minetype == "docs/docx" ||
            file.minetype == "docs/pdf" ||
            file.minetype == "docs/txt" ||
            file.minetype == "docs/xlsx" ||
            file.minetype == "docs/pptx"
        ){
            callback(null, true)
        } else {
            console.log('file not supportted')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload