const { getAllCities, getCinemasByCityId, getMoviesByCinemaId, getMoviesByCityId , getMovieSessionsByCityId, getMovieSessionsByCinemaId} = require("./repository")

let cityId =null;
let cinemaId = null;
let movieId = null;

beforeAll(async() => {
    const cities = await getAllCities();
    cityId = cities[cities.length - 1]._id;

    const cinemas = await getCinemasByCityId(cityId);
    cinemaId = cinemas[0]._id;

    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
})

test('getAlCities', async () => {
    const cities = await getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();
})

test('getCinemasByCityId', async () => {
    const cinemas = await getCinemasByCityId(cityId);
    expect(Array.isArray(cinemas)).toBeTruthy();
})

test('getMoviesByCinemaId', async () => {
    const movies = await getMoviesByCinemaId(cinemaId);
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('getMoviesByCityId', async () => {
    const movies = await getMoviesByCityId(cityId);
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('getMovieSessionsByCityId', async () => {
    const movieSessions = await getMovieSessionsByCityId(movieId, cityId);
    expect(Array.isArray(movieSessions)).toBeTruthy();
    expect(movieSessions.length).toBeTruthy();
})

test('getMovieSessionsByCinemaId', async () => {
    const movieSessions = await getMovieSessionsByCinemaId(movieId, cinemaId);
    console.log(movieSessions)
    expect(Array.isArray(movieSessions)).toBeTruthy();
    expect(movieSessions.length).toBeTruthy();
})