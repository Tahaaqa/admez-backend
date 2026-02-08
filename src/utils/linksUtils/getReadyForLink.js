const { v4: uuidv4 } = require('uuid');
const CustomError = require('../errors/CustomError');

const readyMediaDataLink = (req ,res ,next)=> {

  console.log("getting data ready for media link creating middleware ...")
  try{  
  req.uuid =uuidv4().split('-')[0];
  const timestamp =  Date.now();
  req.timestamp = timestamp
  req.type = "media" 
  const userId = req.user._id;
  const folderPath =  `uploads/${userId}/media_${timestamp}`; 
  req.folderPath = folderPath;
  const ThumbnailsPath =  `uploads/${userId}/thumbnails_${timestamp}`; 
  req.ThumbnailsPath = ThumbnailsPath
  next()
}catch(e){
  next(new CustomError("failed getting your link Ready !", 400 ))
}
}


const readyFileDataLink = (req ,res ,next)=> {
  console.log("getting data ready for file link creating middleware ...")
  try{   
    req.uuid =uuidv4().split('-')[0];
    const timestamp =  Date.now();
    req.timestamp = timestamp
    req.type = "file"  
    const userId = req.user._id; 
    const folderPath =  `uploads/${userId}/media_${timestamp}`;
    req.folderPath = folderPath;
    next()
  }catch(e){
    next(new CustomError("failed getting your link Ready ! ** FILE ** ", 400 ))
  }
}

module.exports = {readyMediaDataLink ,readyFileDataLink }