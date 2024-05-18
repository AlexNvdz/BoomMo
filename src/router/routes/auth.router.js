const { Router } = require("express");
const AuthController = require("../../controllers/auth.controller");
const UsersController = require("../../controllers/users.controller");
const routerAuth = Router()

routerAuth.get("/register", (req, res) => {
  res.render("layouts/register");
});

routerAuth.get("/login", (req, res) => {
  res.render("layouts/login");
});

routerAuth.get("/forgotpass", (req, res) => {
  res.render("layouts/forgot");
});

routerAuth.get("/logout", (req, res) => {
  req.session.userId = null
  req.session.email = null
  req.session.userData = null
  AuthController.logout(req,res);
});

routerAuth.get("/verifyotp", (req, res) => {
  const otp = req.session.otp
  if (!otp) return res.redirect("/forgotpass")
  return res.render("layouts/formotp");
});


routerAuth.get("/resetpass", (req, res) => {
  const isVerifyedOTP = req.session.isVerifyedOTP
  if (!isVerifyedOTP) return res.redirect("/forgotpass")
  return res.render("layouts/resetpass");
});

routerAuth.post("/register", (req, res) => {
  AuthController.register(req, res)
})

// autenticacion
routerAuth.post('/login', async (req, res) => {
  AuthController.login(req, res)
})

routerAuth.post("/forgotpass", (req, res) => {
  AuthController.getOtp(req, res)
});


routerAuth.post("/verifyotp", (req, res) => {
  AuthController.verifyOtp(req, res)
});

routerAuth.post("/resetpass", (req, res) => {
  UsersController.resetPass(req,res)
});

module.exports = { routerAuth }