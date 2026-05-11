const http = require("http");
const fs = require("fs");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const jsYaml = require("js-yaml");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const OpenApiValidator = require("express-openapi-validator");
const logger = require("./logger");
const config = require("./config");
const session = require("express-session");
const passport = require("./config/passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const apiKeyAuth = require("./middleware/ApiKeyAuth");
const BasicAuth = require("./middleware/BasicAuth");
const User = require("./models/User");
const authRoutes = require('./routes/authRoutes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(openApiYaml));
    } catch (e) {
      logger.error("failed to start Express Server", e.message);
    }
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "14MB" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use("/api/", limiter);
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "public", "views"));
    this.app.use(express.static(path.join(__dirname, "public")));
    
    const sessionOptions = {
      secret: "my top secret key",
      resave: false,
      saveUninitialized: true,
    };
    this.app.use(session(sessionOptions));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use((req, res, next) => {
      if (req.user) {
        console.log(`[AUTH LOG] Pedido recebido de: ${req.user.firstName} ${req.user.lastName} (${req.user.email})`);
      }
      next();
    });

    this.app.get('/', async (req, res) => {
      let apiKey = null;
      if (req.user) {
        const dbUser = await User.findByPk(req.user.id);
        apiKey = dbUser ? dbUser.apiKey : null;
      }
      res.render('index', {
        user: req.user || null,
        apiKey: apiKey,
        authMethod: req.session.authMethod || null,
        apikey_status: req.query.apikey_status || null,
        apikey_name: req.query.name || null,
        apikey_email: req.query.email || null,
        error: req.query.error
      });
    });

    this.app.use('/', authRoutes);

    this.app.use(apiKeyAuth);

<<<<<<< HEAD
    this.app.get("/hello", (req, res) =>
      res.send(`Hello World. path: ${this.openApiPath}`)
    );

=======
    this.app.get("/hello", (req, res) => res.send(`Hello World. path: ${this.openApiPath}`));
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d
    this.app.get("/openapi", (req, res) => res.sendFile(this.openApiPath));
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(this.schema));

    this.app.use(BasicAuth);

    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
      }),
    );
  }

  launch() {
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || "",
      });
    });

    http.createServer(this.app).listen(this.port);
    console.log(`Listening on port ${this.port}`);
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;