const express = require("express");
const cors = require("cors");
const { claireTrace, claireError } = require("../helper/Logs");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  logMiddleware(req, res, next) {
    const defaultWrite = res.write;
    const defaultEnd = res.end;
    const chunks = [];

    res.write = (...restArgs) => {
      chunks.push(new Buffer.from(restArgs[0]));
      defaultWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(new Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString("utf8");
      const objLog = {
        statusCode: res.statusCode,
        path: req.originalUrl,
        bodyRequest: req.body,
        bodyResponse: body,
        method: req.method,
      };

      objLog.statusCode === 200
        ? claireTrace.trace(objLog)
        : claireError.error(objLog);

      defaultEnd.apply(res, restArgs);
    };

    next();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parse body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static("public"));

    //Loggs de respuesta y de consulta
    this.app.use(this.logMiddleware);
  }

  routes() {
    this.app.use("/api/users", require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("process.env.PORT", `http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
