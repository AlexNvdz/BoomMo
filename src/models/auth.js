const poolConnection = require("../database/Conexion")
const { Utils } = require("../utils/utils")

class Auth{
    static async register(body){
        const {user,pass,correo} = body
        await poolConnection.query(`
        INSERT INTO usuarios 
        (usuario,contrasenia,correo,id_rol)
        VALUES(?,?,?,2)
        `,[user,pass,correo])
    }
    static async regOtp(correo,otp) {
        await poolConnection.query(`
        INSERT INTO otp 
        (otp,id_usuario,estado)
        VALUES(?,(
            SELECT id FROM usuarios WHERE correo = ?
        ),"vigente")
        `,[otp,correo])
    }
    static async verifyOtp(correo) {
        const [result] = await poolConnection.query(`
        SELECT * FROM otp otpsaved
        WHERE id_usuario = (
            SELECT id FROM usuarios WHERE correo = ?
        ) AND estado = "vigente"
        `,[correo])
        return result
    }
    static async compareOtp(correo,otp) {
        const [result] = await poolConnection.query(`
        SELECT * FROM otp 
        WHERE id_usuario = (
            SELECT id FROM usuarios WHERE correo = ?
        ) AND estado = "vigente" AND otp = ?
        `,[correo,otp])
        return result
    }
    static async deltOtDupl(id_usuario) {
        const [result] = await poolConnection.query(`
        DELETE FROM otp
         id_usuario = ?
        `,[id_usuario])
        }
    static async deltOtp(id_usuario,otp) {
        const [result] = await poolConnection.query(`
        DELETE FROM otp
        WHERE otp = ? AND id_usuario = ?
        `,[otp,id_usuario])
        return result
    }
}

module.exports = Auth