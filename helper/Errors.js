module.exports = function(err, req, res, next) {
        console.log("🚀 ~ file: Errors.js ~ line 2 ~ err", err)
            err.status = err.status || 500;
            if (!err.json) {
              err.json = {
                status:err.status,
                success: false,
                message: 'oops',
              }
            };
          
            console.log(err.stack);
            res.status(err.status).json(err.json);
          
}