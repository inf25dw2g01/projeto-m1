const User = require('../models/User');

const apiKeyAuth = async (req, res, next) => {
    if (req.user) {
        return next();
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return next();
    }

    try {
        const user = await User.findOne({ where: { apiKey: apiKey } });

        if (!user) {
            return res.status(401).json({ error: 'API Key inválida' });
        }

        req.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        logUserInfo(req.user, req);
        
        next();
    } catch (err) {
        console.error('Erro na validação da API Key:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const logUserInfo = (user , req)=>{
    console.log("Nome do User :" , user.firstName + " " + user.lastName)
}

module.exports = apiKeyAuth;