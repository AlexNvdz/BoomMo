const express = require("express");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { join } = require("path")
const { router } = require("./src/router/router.js");
const { nextTick } = require("process");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/resources", express.static(join(__dirname, "./src/public")));

app.set("view engine", "ejs");
app.set('views', join(__dirname, './src/views'));

app.use(cookieParser())
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }))

app.use((req, res, next) => {
  if (!req.session.userId)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use(router)

app.use((req, res, next) => {
  res.status(404).render("layouts/blank", { msg: 'Ruta no encontrada' });
  next()
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`SERVER RUNNING IN http://localhost:${PORT}/login`);
});
