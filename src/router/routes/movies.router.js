const { Router } = require("express");
const MoviesController = require("../../controllers/movies.controller");
const routerMovies = Router()
const multer = require("multer")
const uploadArray = multer().array("imgs")

routerMovies.get("/", (req, res) => {
  MoviesController.getAll(req,res)
});

routerMovies.get("/releases", (req, res) => {
  MoviesController.getReleases(req,res)
});



routerMovies.get("/imgs", (req, res) => {
  MoviesController.getImgs(req,res)
});

routerMovies.get("/view", (req, res) => {
  MoviesController.view(req,res)
});

routerMovies.get("/find", (req, res) => {
  MoviesController.findById(req,res)
});


routerMovies.post("/new",uploadArray, (req, res) => {
  MoviesController.reg(req,res)
});


module.exports = routerMovies