const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Auth = require("../models/auth")
const { Utils } = require("../utils/utils.js")
const Users = require("../models/users.js")
const { promisify } = require("node:util")
const { Nodemailer } = require("../lib/nodemailer.js")
const { genHtmlForMail } = require("../utils/htmlMails.js")

class AuthController {
    static async register(req, res) {
        try {
            const body = req.body
            const { user, correo, pass } = body
            // verifico que los campos no sean nulos
            if (!user || !correo || !pass) {
                res.render('layouts/register', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Campos vacios!",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'register'
                })
            } else {
                // hago validaciones de cada campo
                const regexCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                const testCorreo = regexCorreo.test(correo)
                const lenPass = pass.length < 8
                const isUserRegister = await Users.find(user,correo)
                if (!testCorreo) {
                    res.render('layouts/register', Utils.alert("Correo invalido!", "Error", false, "error", "register"))
                } else if (lenPass) {
                    res.render('layouts/register', Utils.alert("La contraseña debe tener al menos 8 caracteres!", "Error", false, "error", "register"))
                } else if (isUserRegister.length > 0) {
                    res.render('layouts/register', Utils.alert("Usuario invalido!", "Error", false, "error", "register"))
                } else {
                    const salt = bcryptjs.genSaltSync(9)
                    let passwordHaash = bcryptjs.hashSync(pass, salt);
                    body.pass = passwordHaash
                    await Auth.register(body)
                    const htmlOtp = genHtmlForMail()
                    const bodyMail = {
                        html: htmlOtp,
                        subject: "bienvenid@ a boommo",
                        email: correo
                    }
                    await Nodemailer.sendEmail(bodyMail)
                    res.render("layouts/register", Utils.alert("Registro exitoso!", "Éxito!", 1500, "success", "login", false))
                }
            }
        } catch (error) {
            console.log(error)
            res.render("layouts/register", Utils.alert("Error inesperado!", "Error", false, "error", "register"))
        }
    }
    static async login(req, res) {
        try {
            const body = req.body
            const { user, pass } = body
            // validar que los campos no sean nulos
            if (!user || !pass) res.render("layouts/register", Utils.alert("Campos vacios!", "Error", false, "error", "register"));
            else {
                // valido si existe un usuario en la bd
                const findUser = await Users.find(user)
                if (findUser.length > 0) {
                    const { correo, usuario, contrasenia, id_rol, id } = findUser[0]
                    if (!(await bcryptjs.compare(pass, contrasenia))) res.render("layouts/login", Utils.alert("Credenciales invalidas!", "Error", false, "error", "login"))
                    else {
                        const token = this.signToken({user,correo})
                        const cookieOptions = {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                        }
                        req.session.user = usuario
                        req.session.idRol = id_rol
                        req.session.email = correo
                        req.session.userId = id
                        const idRolInt = parseInt(id_rol)
                        if (idRolInt === 2) res.cookie("boommo", token, cookieOptions).render("layouts/login", Utils.alert("Sesión iniciada!", "Éxito", 2500, "success", "users/inicio", false))
                        else res.cookie("boommo", token, cookieOptions).render("layouts/login", Utils.alert("Sesión iniciada!", "Éxito", 2500, "success", "admin/dashboard", false))
                    }
                }
                else {
                    res.render("layouts/login", Utils.alert("Usuario invalido!", "Error", false, "error", "login"))
                }
            }
        } catch (error) {
            console.log(error)
            res.render("layouts/login", Utils.alert("Error inesperado!", "Error", false, "error", "login"))
        }
    }
    static signToken(user) {
        const secret = process.env.SECRETKEY
        const token = jwt.sign({ user }, secret, {
            expiresIn: "1h"
        })
        return token
    }
    static async getOtp(req, res) {
        const body = req.body
        const { email } = body
        if (!email) return res.render("layouts/forgot", Utils.alert("Error!", "Campos vacios!", false, "error", "forgotpass"))
        else {
            const find = await Users.findByEmail(email)
            if (find.length > 0) {
                const { id } = find[0]
                // ver si tiene un codigo vigente (pend)
                const existOtpVg = await Auth.verifyOtp(email)
                if (existOtpVg.length > 0) {
                    const { otpsaved } = existOtpVg[0]
                    Auth.deltOtDupl(id)
                }
                const otp = Utils.genCode()
                req.session.otp = otp
                req.session.email = email
                req.session.userId = id
                Auth.regOtp(email, otp)
                // send mail
                const htmlOtp = genHtmlForMail(otp)
                const bodyMail = {
                    html: htmlOtp,
                    subject: "verificacion otp",
                    email: email
                }
                await Nodemailer.sendEmail(bodyMail)

                setTimeout(() => {
                    Auth.deltOtp(req.session.userId, req.session.otp)
                    req.session.otp = null
                    req.session.isVerifyedOTP = true
                }, 300000);
                res.render("layouts/forgot", Utils.alert("Hemos enviado un codigo de verificación a tu correo", "Éxito!", 2700, "success", "verifyotp", false))
            } else res.render("layouts/forgot", Utils.alert("Este correo no existe!", "Error!", false, "error", "forgotpass"))
        }
    }
    static async verifyOtp(req, res) {
        try {
            const emailSession = req.session.email
            const body = req.body
            const { otpuser } = body
            if (!otpuser) return res.render("layouts/formotp", Utils.alert("Error!", "Campos vacios!", false, "error", "verifyotp"))
            else {
                const getOtp = await Auth.compareOtp(emailSession, otpuser)
                if (getOtp.length > 0) {
                    const { otp, id_usuario } = getOtp[0]
                    if (otpuser != otp) return res.render("layouts/formotp", Utils.alert("Código expirado o invalido!", "Error!", false, "info", "verifyotp"))
                    else {
                        req.session.otp = null
                        req.session.isVerifyedOTP = true
                        await Auth.deltOtp(id_usuario, otp)
                        return res.render("layouts/formotp", Utils.alert("Solicitud exitosa!", "Éxito!", 2700, "success", "resetpass", false))
                    }
                } else return res.render("layouts/formotp", Utils.alert("Código expirado o invalido!", "Error!", false, "info", "verifyotp"))
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async isAuthenticated(req, res, next) {
        if (req.cookies.boommo) {
            try {
                const secret = process.env.SECRETKEY;
                const decodificaded = await promisify(jwt.verify)(req.cookies.boommo, secret);
                const results = await Users.find(decodificaded.user.user,decodificaded.user.email);

                if (results.length === 0) {
                    return next();
                }
                req.session.userData = results[0];
                return next();
            } catch (error) {
                console.error(error);
                return res.status(500).render("layouts/blank",{ msg: 'Ha ocurrido un error',msgLogin:true });
            }
        } else {
            return res.status(401).render("layouts/blank",{msg: "Debe iniciar sesión",msgLogin:true});
        }
    }
    static async logout(req,res){
        res.clearCookie("boommo").redirect("/login")
    }
    static async isAdmin(action) {
        return async (req, res) => {
            try {
                // const empReg = res.locals.session.info.emp
                // if (emp != empReg) res.status(404).send(`<h1 style='font-size: 9em; text-align:
                // center; margin-top: 1em; color: ff002a;'>404</h1> 
                // <h2 style="text-align: center; margin-top: 1em;">PAGE NOT FOUND</h2>`)
                if (req.session.user && req.session.idRol === 1) {
                    action(req, res); // Ejecuta la acción si el rol es válido
                }
            } catch (error) {
                res.render("index", { headerAdmin: "sddsd", stylesFiles, listComponents, lenUsers, lenMovies, titlePage: "Dashboard", name: "admin" })
                console.log(error)
            }
        }
    }


}

module.exports = AuthController