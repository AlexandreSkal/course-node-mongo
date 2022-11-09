const { ObjectId } = require('mongodb');

const cinemaCatalog = [{
    cidade: "Gravataí",
    uf: "RS",
    cinemas: []
}, {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [{
        _id: new ObjectId("605e57238ed0562b5da2f87d"),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [{
            nome: 1,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: "605e57238ed0562b5da2f87d",
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87d"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-06-01T13:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }, {
            nome: 2,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87c"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-01T13:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87c"),
                filme: "Vingadores: Ultimato",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }, {
        _id: new ObjectId("605e57238ed0562b5da2f87c"),
        nome: "GNC Lindóia",
        salas: [{
            nome: 100,
            sessoes: [{
                data: new Date("2021-03-30T19:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87c"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-30T11:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87c"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-30T13:00:00Z"),
                idFilme: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }]
}]

function getAllCities() {
    return cinemaCatalog.map(catalog => {
        return {
            _id: new ObjectId("605e57238ed0562b5da2f87e"),
            pais: catalog.pais,
            uf: catalog.uf,
            cidade: catalog.cidade
        }
    })
}

function getCinemasByCityId(cityId) {
    if (cityId < 0) return null;
    return cinemaCatalog[cinemaCatalog.length - 1].cinemas;
}

function getMoviesByCinemaId(cinemaId) {
    if (cinemaId < 0) return null;
    return getCinemasByCityId().map(cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme
        }
    })
}

async function getMoviesByCityId(cityId) {
    return getMoviesByCinemaId(cityId);
}

async function getMovieSessionsByCityId(movieId, cityId) {
    if (movieId < 0 || cityId < 0) return null;
    return getCinemasByCityId().map(cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme,
            cinema: cinema.nome,
            idCinema: cinema._id,
            sala: cinema.salas[0].nome,
            sessao: cinema.salas[0].sessoes[0]
        }
    });
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
    return getMovieSessionsByCityId(movieId, cinemaId);
}

module.exports = {
    getAllCities,
    getCinemasByCityId,
    getMoviesByCinemaId,
    getMoviesByCityId,
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
}