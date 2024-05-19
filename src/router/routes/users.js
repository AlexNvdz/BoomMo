const { Router } = require("express");
const { Categorys, Movies } = require("../../models/movies");
const UsersController = require("../../controllers/users.controller");
const { Utils } = require("../../utils/utils");
const Users = require("../../models/users");
const AuthController = require("../../controllers/auth.controller");
const routerUsers = Router()


routerUsers.get("/perfil", (req, res) => {
  const correo = req.session.email
  const user = req.session.user
  res.render("partials/perfil", {name: user,correo})

});

routerUsers.get("/inicio",AuthController.isAuthenticated, async(req, res) => {
  const user = req.session.user
  const moviesReleases = await Movies.getReleases()
  const movies = await Movies.getAll()
  const listComponents = ["partials/hero","partials/homeMoviesList"]
  const stylesFiles = ["../resources/css/inicio.css"]
  res.render("index", { name:user, moviesReleases,listComponents,titlePage:"Inicio",stylesFiles,movies });
});

routerUsers.get("/categorias", async(req, res) => {
  const categs = await Categorys.get()
  const stylesFiles = ["../resources/css/peliculas.css","../resources/css/partials/categorias.css"]
  const listComponents = ["partials/categorias"]
  res.render("index", { name: req.session.user,categs,titlePage: "Categorias",stylesFiles,listComponents });
});

routerUsers.get("/categoria/:ctg", async(req, res) => {
  const {ctg} = req.params
  const movies = await Movies.findByCateg(ctg)
  const listComponents = ["partials/movieItems"]
  const stylesFiles = ["/resources/css/inicio.css"]
  const user = req.session.user
  res.render("index", { name: user,movies,listComponents,stylesFiles,titlePage: ctg });
});

routerUsers.get("/favoritos", async(req, res) => {
  const {userId,user} = req.session
  const movies = await Users.getFavorites({userId})
  const listComponents = ["partials/movieItems"]
  const stylesFiles = ["/resources/css/inicio.css"]
  res.render("index", { movies,titlePage: "Favoritos",name: user,listComponents,stylesFiles: stylesFiles})
});

routerUsers.get("/historial", async(req, res) => {
  const {userId,user} = req.session
  const movies = await Users.getHistoryViews(userId)
  const listComponents = ["partials/movieItems"]
  const stylesFiles = ["/resources/css/inicio.css"]
  res.render("index", { movies,titlePage: "Historial",name: user,listComponents,stylesFiles: stylesFiles})
});

routerUsers.post("/updtdata", (req, res) => {
  UsersController.updateData(req,res)
});

routerUsers.post("/aggfav", (req, res) => {
  UsersController.aggFavorite(req,res)
});

routerUsers.post("/deltfav", (req, res) => {
  UsersController.deltFavorite(req,res)
});

module.exports.routerUsers = routerUsers