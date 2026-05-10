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
const bcrypt = require("bcrypt");
const User = require("./models/User");
const { error } = require("console");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "14MB" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      helmet({
        contentSecurityPolicy: false, // Desativar para poder correr os scrips do ejs
      }),
    );
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
        console.log(
          `[AUTH LOG] Pedido recebido de: ${req.user.firstName} ${req.user.lastName} (${req.user.email})`,
        );
      }
      next();
    });

    this.app.get('/', async (req, res) => {
      let apiKey = null;
      if (req.user) {
        const User = require('./models/User');
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

    this.app.post('/auth/apikey', async (req, res) => {
    const { apikey } = req.body;
    if (!apikey) return res.redirect('/');

    try {
        const User = require('./models/User');
        const user = await User.findOne({ where: { apiKey: apikey } });

        if (!user) return res.redirect('/?apikey_status=invalid');

        console.log(`[APIKEY LOG] Pedido recebido de: ${user.firstName} ${user.lastName || ''}`);

        return res.redirect(`/?apikey_status=valid&name=${encodeURIComponent(user.firstName)}&email=${encodeURIComponent(user.email)}`
      );

    } catch (err) {
        console.error('Erro na autenticação por API Key:', err);
        res.redirect('/');
    }
  });

    this.app.get(
      "/auth/github",
      passport.authenticate("github", { scope: ["user:email"] }),
    );
    this.app.get(
      "/auth/github/callback",
      passport.authenticate("github", { failureRedirect: "/" }),
      (req, res) => {
        
          req.session.authMethod = 'github';
          res.redirect("/");
      },
    );

    this.app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] }),
    );
    this.app.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        
          req.session.authMethod = 'google';
          res.redirect("/");
      },
    );

    this.app.get(
      "/auth/discord",
      passport.authenticate("discord", { scope: ["identify", "email"] }),
    );
    this.app.get(
      "/auth/discord/callback",
      passport.authenticate("discord", { failureRedirect: "/" }),
      (req, res) => {
        
          req.session.authMethod = 'discord';
          res.redirect("/");
      },
    );

    this.app.get("/auth/logout", (req, res, next) => {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });

    this.app.use(apiKeyAuth);

    this.app.get("/hello", (req, res) =>
      res.send(`Hello World. path: ${this.openApiPath}`)
    );
    // Send the openapi document *AS GENERATED BY THE GENERATOR*
    this.app.get("/openapi", (req, res) => res.sendFile(this.openApiPath));
    // View the openapi document in a visual interface. Should be able to test from this page
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(this.schema));

    this.app.use(BasicAuth);

    this.app.post(
      "/auth/basic/login",
      express.urlencoded({ extended: true }),
      async (req, res) => {
        const { email, password } = req.body;

        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return res.redirect("/?error=invalid_credentials");
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            return res.redirect("/?error=invalid_credentials");
          }

          const loginUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };

          req.login(loginUser, (err) => {
            if (err) return res.redirect("/?error=server_error");
            res.redirect("/");
          });
        } catch (err) {
          console.error("Basic auth login error:", err);
          res.redirect("/?error=server_error");
        }
      },
    );

    this.app.get("/auth/register", (req, res) => {
      res.render("register", { error: req.query.error });
    });

    this.app.post("/auth/register", express.urlencoded({ extended: true }), async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !email || !password) {
        return res.redirect("/auth/register?error=missing_fields");
      }
      try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.redirect("/auth/register?error=email_exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password});
        res.redirect("/?apikey_status=registered");
      } catch (err) {
        console.error("Error checking existing user:", err);
        return res.redirect("/auth/register?error=server_error");
      }
    });

    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
      }),
    );
  }
  
  launch() {
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      // format errors
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
