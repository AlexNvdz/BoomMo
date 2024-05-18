const { Movies } = require("../models/movies")
const { Utils, UtilsDate } = require("../utils/utils")
const UsersController = require("./users.controller")

class MoviesController {
    static async getAll(req, res) {
        try {
            const movies = await Movies.getAll()
            res.json(movies)
        } catch (error) {
            console.log(error)
        }
    }
    static async getReleases(req, res) {
        try {
            const movies = await Movies.getReleases()
            res.json(movies)
        } catch (error) {
            console.log(error)
        }
    }
    static async getImgs(req, res) {
        try {
            const { id } = req.query
            const imgs = await Movies.getImgsByIdMovie(parseInt(id))
            res.json(imgs)
        } catch (error) {
            console.log(error)
        }
    }
    static async getByCateg(req, res) {
        try {
            const { categ } = req.query
            const movies = await Movies.getByCateg(categ)
            res.json(movies)
        } catch (error) {
            console.log(error)
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.query
            const idParse = parseInt(id)
            const movie = await Movies.findById(idParse)
            res.json(movie)
        } catch (error) {
            console.log(error)
        }
    }
    static async reg(req, res) {
        try {
            const listImg = Utils.saveImgs(req, res) //guarda las imagenes en el servidor y devuelve una lista con los nombres
            const listUrl = Utils.getUrlImg(listImg) //devuelve una lista con las url de las imagenes guardadas
            const body = req.body
            const stylesFiles = ["/resources/css/admin.css", "/resources/css/inicio.css"]
            const listComponents = ["partials/formaddmovie"]
            const { titulo, descripcion, categ, lanz, url, director } = body
            if (!titulo || !descripcion || !categ || !lanz || !url || !director) res.render('index', {stylesFiles, listComponents,titlePage: "Peliculas", name: "",alert: Utils.alert("Campos vacios!", "Error", false, "error", "admin/newmovie")});

            else {
                const existMovie = await Movies.verifyExist(titulo)
                if (existMovie.length > 0) res.render('index',{stylesFiles, listComponents,titlePage: "Peliculas", name: "",alert: Utils.alert("Registro duplicado!", "Error", false, "error", "admin/newmovie")})
                else {
                    body.imgPortd = listUrl[0]
                    await Movies.regMovie(body)
                    for (let i = 1; i < listUrl.length; i++) {
                        const url = listUrl[i];
                        await Movies.regImgs(url);
                    }
                    Utils.listImgsToSave = []
                    res.render('index',{name: "",listComponents,stylesFiles,titlePage: "Peliculas",alert: Utils.alert("Registro exitoso!", "Exito!", 1500, "success", "admin/peliculas", false)})
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async view(req, res) {
        try {
            const { movieid } = req.query
            const movie = await Movies.findById(movieid)
            const movieData = movie[0]
            const { id } = movieData
            req.session.movieId = id
            const user = req.session.user
            let date = UtilsDate.getDate()
            await UsersController.aggView(req, date)
            const stylesFiles = ["../resources/css/peliculas.css", "../resources/css/partials/categorias.css", "../resources/css/partials/view.css"]
            const listComponents = ["partials/viewmovie"]
            res.render("index", { name: user, titlePage: "View", stylesFiles, listComponents, movie: movieData });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MoviesController