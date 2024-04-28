const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils/tokenUtils");

const authenticateUser = async (req,res,next) =>{
    const {token} = req.cookies;
    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Authentication invalid'})
    }

    try {
        const {userId,role,isProjectManager} = verifyJWT(token)
        req.user = {userId,role,isProjectManager}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Authentication invalid'})
    }

 }

 const authorizePermission = function(...roles){
    return (req,res,next) =>{
     if(!roles.includes(req.user.role)){
        return res.status(StatusCodes.FORBIDDEN).json({msg:'Not authorized to access this feature'})
     }
        next()
    }
 }
 const isProjectManager = function(isProjectManager){
    return (req,res,next) =>{
     if(isProjectManager!==(req.user.isProjectManager)){
        return res.status(StatusCodes.FORBIDDEN).json({msg:'Not authorized to access this feature'})
     }
        next()
    }
 }



module.exports = {authenticateUser, authorizePermission,isProjectManager}