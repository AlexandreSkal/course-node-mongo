const cinemaCatalog = require('./api/cinemaCatalog');
const repository = require('./repository/repository');
const server = require('./server/server');

(async () => {
    try {
        await server.start(cinemaCatalog, repository);
    }
    catch (error) {
        console.error(error);
    }

})();