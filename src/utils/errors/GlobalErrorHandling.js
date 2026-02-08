const globalErrorHandle = (error , req , res , next ) => {
 
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

   
  res.status(error.statusCode).json(
  {  
    statusCode : error.statusCode ,
    message : error.message , 
    success : false
  } 
  )

}

module.exports = globalErrorHandle