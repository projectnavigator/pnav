const {StatusCodes} = require ("http-status-codes");
const file = require('../models/UploadsSchema');
const { response } = require("express");

const createFile = (req, res, next) => {
    let file = new File({
        name: req.body.name,
        
    })
    if(req.file){
        file.file = req.file.path;
    }
    file.save()
    .then(response => {
        res.status({
            message: 'File Uploaded Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })
}