const {Router} = require("express")
const router = Router()
const AuthController = require("../controllers/auth.controller");
const {routerAuth} = require("./routes/auth.router.js")
const {routerUsers}  = require("./routes/users.js")
const {routerAdmin} = require("./routes/admin.router.js")
const routerMovies = require("./routes/movies.router.js")

router.use("/",routerAuth)
router.use("/admin",AuthController.isAuthenticated,routerAdmin)
router.use("/users",AuthController.isAuthenticated,routerUsers)
router.use("/movies",AuthController.isAuthenticated,routerMovies)


module.exports.router = router