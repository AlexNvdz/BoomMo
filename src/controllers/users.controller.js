const bcryptjs = require("bcryptjs")
const Users = require("../models/users")
const { Utils } = require("../utils/utils")

class UsersController {
    static async resetPass(req, res) {
        // resetea la contraseña del usuario
        try {
            const emailSession = req.session.email
            const userId = req.session.userId
            const body = req.body
            const { pass1, pass2 } = body
            if (!pass1 || !pass2) return res.render("layouts/resetpass", Utils.alert("Error!", "Campos vacios!", false, "error", "resetpass"))
            else {
                if (pass1 === pass2) {
                    const newPass = bcryptjs.hashSync(pass2, bcryptjs.genSaltSync(9))
                    Users.updt({ contrs: newPass, id: userId })
                    return res.render("layouts/resetpass", Utils.alert("Se actualizo la contraseña!", "Éxito!", 2500, "success", "login", false))
                    req.session.userId = null
                } else return res.render("layouts/resetpass", Utils.alert("Las contraseñas no coinciden!", "Invalido!", false, "warning", "resetpass"))
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async updateData(req, res) {
        try {
            // actualiza los datos
            const userId = req.session.userId
            const body = req.body
            const { correo, contrs, usrio } = body
            if (correo || contrs || usrio){
                if (contrs){
                    if (contrs.length >= 8)  {
                        const hashPass = bcryptjs.hashSync(contrs, bcryptjs.genSaltSync(9))
                        body.contrs = hashPass
                    } else return res.json({msg:"Contraseña debe contener mas de 8 caracteres",bgCode:"#ce7209"})
                }
                
                if(usrio) req.session.user = usrio
                if(correo) req.session.email = correo

                const bodyToSave = {
                    ...body,
                    id: userId
                }
                await Users.updt(bodyToSave)
                return res.json({msg:"Datos actualizados exitosamente",bgCode:"#17bf3b"})
            } 
            else {
                return res.json({msg:"Campos vacios",bgCode:"#de0808"})
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async aggView(req, date) {
        // inserta al historial en la db cuando el usuario mira una pelicula
        const movieId = req.session.movieId
        const userId = req.session.userId
        const verifyMovie = await Users.verifyView(movieId,userId,date)
        if (verifyMovie.length === 0){
            const body = {
                movieId,
                userId,
                date
            }
            await Users.aggView(body)
        } 
    }
    
    static async aggFavorite(req,res){
        // agrega peliculas a favoritos
        try {
            const userId = req.session.userId
            const {movieId} = req.body
            const verify = await Users.verifyFavorite({userId,movieId})
            if (verify.length < 1) await Users.aggFavorite({userId,movieId})
        } catch (error) {
            console.log(error)
        }
    }
    static async deltFavorite(req,res){
        try {
            const userId = req.session.userId
            const {movieId} = req.body
            await Users.deltFavorite({userId,movieId})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UsersController