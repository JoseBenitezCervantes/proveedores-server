const axios = require("axios");
const { listPath } = require("../routes/ListRoutes");

const middlewareResolve = async (req, res, next) => {
  const data = req.body;
  const pathRequest = req?.url;
  const { resolveMiddleware: pathResolve, methodResolve: method } =
    listPath.find((x) => x.requestFront === pathRequest) ?? {};
  
  if (pathResolve) {
    try {
      const response = await axios({
        method,
        url: pathResolve,
        data
      });
       
      const dataResult = response?.data;
      res.status(200).json({ code: 0, message: "Respuesta exitosa", data: dataResult});
      next();
    } catch (error) {
      const message = error?.message;

      if (error.response) {  // Request made and server responded
        const status = error?.response?.status;
        res.status(status).json({ code: status, message, data: {status} });
        next();

      } else if (error.request) { // The request was made but no response was received
        res.status(500).json({ code: 500, message: `The request was made but no response was received. CATCH ERROR: ${message}`, data: {} });
        next();

      } else {// Something happened in setting up the request that triggered an Error
        res.status(500).json({ code: 500, message, data: {} });
        next();
      }
    }
  } else {
    res.status(404).json({ code: 404, message: "No se encontro pathResolve", data:{} });
  }
};


module.exports = { middlewareResolve };
