const schema = require('../schema/schemaMovie');
const jwt = require('jsonwebtoken');
const ADMIN_PROFILE = 1;

function validadteMiddleware(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
        const { details } = error;
        return res.status(422).json(details.map(i => i.message));
    }

    next();
}

async function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    token = token.replace('Bearer ', '');

    try {
        const { userId, profileId } = jwt.verify(token, process.env.SECRET);
        res.locals.userId = userId;
        res.locals.profileId = profileId;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

function validadeAdmin(req, res, next){
    const {profileId} = res.locals;
    if(profileId == ADMIN_PROFILE) 
        next();
    else
        res.sendStatus(403);
}

module.exports = { validadteMiddleware, validateToken, validadeAdmin }