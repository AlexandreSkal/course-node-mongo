const { json } = require("express");
const { validadteMiddleware, validateToken, validadeAdmin } = require('../middlewares/validationMiddleware');
const logger = require('../config/logger');

module.exports = (app, repository) => {

    app.get('/movies/premieres', validateToken, async (req, res, next) => {
        const movies = await repository.getMoviesPremieres();
        res.json(movies);
    })
    app.get('/movies/:id', validateToken, async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id);
        if (!movie) return res.sendStatus(404);

        res.json(movie);
    })
    app.get('/movies', validateToken, async (req, res, next) => {
        const movies = await repository.getAllMovies();
        res.json(movies);

    })

    app.post('/movies', validateToken, validadeAdmin, validadteMiddleware, async (req, res, next) => {
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.ducarao);
        const dataLancamento = new Date(req.body.dataLancamento);
        const imagem = req.body.imagem;
        const categorias = req.body.categorias;

        const result = await repository.addMovies({ titulo, sinopse, duracao, dataLancamento, imagem, categorias })

        logger.info(`UserId: ${res.locals.userId} added the movie ${result} at ${new Date()}`)
        res.status(201).json(result);
    })

    app.delete('/movies/:id', validateToken, validadeAdmin, async (req, res, next) => {
        const id = req.params.id;
        const result = await repository.deleteMovie(id);

        logger.info(`UserId: ${res.locals.userId} deleted the movie ${result} at ${new Date()}`)
        res.sendStatus(204);
    })
}