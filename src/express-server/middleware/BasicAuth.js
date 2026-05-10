const basicAuth = require("basic-auth");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function BasicAuth(req, res, next) {
  if (req.user) {
    return next();
  }

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return next();
  }

  try {
    const dbUser = await User.findOne({ where: { email: user.name } });

    if (!dbUser) {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      return res.status(401).json({ error: "Utilizador não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(user.pass, dbUser.password);

    if (!passwordMatch) {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      return res.status(401).json({ error: "Password inválida." });
    }

    req.user = {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
    };

    
    console.log(
      `[BASIC AUTH] Utilizador autenticado: ${req.user.firstName} ${req.user.lastName} (${req.user.email})`,
    );
    
    next();
    
  } catch (err) {
    console.error("Erro na validação Basic Auth:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = BasicAuth;
