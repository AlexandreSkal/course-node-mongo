const { getAllMovies, getMovieById, getMoviesPremieres, addMovies, deleteMovie } = require("./repository")
let testMovieId = null;

beforeAll(async () => {
    const movies = await getAllMovies();
    testMoviesId = movies[0]._id;
})

test('getAllMovies', async () => {
    const movies = await getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('getMoviesById', async () => {
    const movie = await getMovieById(testMoviesId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(testMoviesId);
})

test('getMoviesPremieres', async () => {
    const monthAgo = new Date();
    monthAgo.setMonth(-1);

    const movies = await getMoviesPremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
})

test('addMovie', async () => {
    const movie = {
        titulo: 'Teste movie',
        sinopse: 'Alguma sinopse',
        duracao: 133,
        dataLancamento: new Date(),
        imagem: 'new_imagem.jpg',
        categorias: ['aventura']
    };

    let result;

    try {
        result = await addMovies(movie)
        expect(result).toBeTruthy();
    }
    finally {
        if (result)
            await deleteMovie(result._id);
    }

})

test('deleteMovie', async () => {
    const movie = {
        titulo: 'Teste movie',
        sinopse: 'Alguma sinopse',
        duracao: 133,
        dataLancamento: new Date(),
        imagem: 'new_imagem.jpg',
        categorias: ['aventura']
    };

    const result = await addMovies(movie);
    const result2 = await deleteMovie(result._id);
    expect(result2).toBeTruthy();



})