const keyModel = require("../models/keyModel");

module.exports = (request, response, next) => {
    const key = request.headers['authorization'];
    const apikey = keyModel.findKey(key.replace('ApiKey', ''));
    if(!apikey)
    response.sendStatus(401);
    
    //apiKey sdfhskdjhfseknfksdnflesk -> para API Keys
    //Bearer jfhslkdfhksdhfksdjhfksdj -> Para Tokens
    //Basic lkjdaslkdjlaskjlkasjdlask -> Para OAuth

    if (apikey || apikey.enabled)
        return next();
    else
        response.sendStatus(401);
}