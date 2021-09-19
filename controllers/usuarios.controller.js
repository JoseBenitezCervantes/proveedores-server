const axios = require("axios");
const { response } = require("express");
const { listPath } = require("../routes/ListRoutes");

const middlewareResolve = async (req, res = response) => {
  const pathRequest = req.route.path;
  const pathResolve = listPath.find( (x) => x.requestFront === pathRequest)?.responseMiddleware;
  
  if (pathResolve) {
    try {
      const response = await axios(pathResolve);
      const dataResult = response?.data;
      res.status(200).json({ code: 0, message: "Respuesta exitosa", data: dataResult});

    } catch (error) {
      const message = error?.message;
      console.log("🚀 ~ file: usuarios.controller.js ~ line 17 ~ middlewareResolve ~ message", message)

      if (error.response) {  // Request made and server responded
        const status = error?.response?.status;
        res.status(200).json({ code: 1, message, data: {status} });

      } else if (error.request) { // The request was made but no response was received
        res.status(200).json({ code: 1, message: `The request was made but no response was received. CATCH ERROR: ${message}`, data: {} });

      } else {// Something happened in setting up the request that triggered an Error
        res.status(200).json({ code: 1, message, data: {} });
      }
    }
  } else {
    res.status(200).json({ code: 1, message: "No se encontro pathResolve", data:{} });
  }
};


module.exports = { middlewareResolve };
