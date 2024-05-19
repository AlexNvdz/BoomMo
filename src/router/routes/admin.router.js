const { Router } = require("express");
const { Movies } = require("../../models/movies");
const AuthController = require("../../controllers/auth.controller.js");
const Users = require("../../models/users");
const routerAdmin = Router()


routerAdmin.get("/dashboard", async (req, res) => {
      const stylesFiles = ["/resources/css/admin.css"]
      const lenMovies = await Movies.getLength()
      const lenUsers = await Users.getLength()
      const listComponents = ["partials/adminCard"]
      res.render("index", { headerAdmin: true, stylesFiles, listComponents, lenUsers, lenMovies, titlePage: "Dashboard", name: "admin" })
})


routerAdmin.get("/peliculas", async (req, res) => {
      const stylesFiles = ["/resources/css/admin.css", "/resources/css/inicio.css"]
      listComponents = ["partials/viewmoviesadmin"]
      const movies = await Movies.getAll()
      res.render("index", { headerAdmin: true, stylesFiles, listComponents,movies, titlePage: "Peliculas", name: "admin" })
});

routerAdmin.get("/newmovie", async (req, res) => {
      const stylesFiles = ["/resources/css/admin.css", "/resources/css/inicio.css"]
      listComponents = ["partials/formaddmovie"]
      res.render("index", { headerAdmin: true, stylesFiles, listComponents, titlePage: "Peliculas", name: "admin" })
});

routerAdmin.get("/perfil", (req, res) => {
      const correo = req.session.email
      const user = req.session.user
      res.render("partials/perfil", {headerAdmin: true,name: user,correo})
    });

module.exports.routerAdmin = routerAdmin