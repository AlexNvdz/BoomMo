const poolConnection = require("../database/Conexion")

class Users {
    static async aggFavorites(body) {
       try {
         const { idPelicula, idUsrio } = body
         await poolConnection.query(`INSERT INTO favoritas (id_pelicula,id_usuario)
         VALUES (?,?)`, [idPelicula, idUsrio])
       } catch (error) {
        console.log(error)
       }
    }
    static async existFavorites(body) {
        try {
          const { idPelicula, idUsrio } = body
          const [result] = await poolConnection.query(`SELECT id FROM favoritas 
          WHERE id_pelicula = ?  AND id_usuario = ?`, [idPelicula, idUsrio])
          return result
        } catch (error) {
         console.log(error)
        }
     }
    static async removeFavorites(body) {
        try {
            const { idPelicula, idUsrio } = body
            await poolConnection.query(`
            DELETE FROM favoritas
            WHERE id_pelicula = ? AND id_usuario = ?`, [idPelicula, idUsrio])
        } catch (error) {
            console.log(error)
        }
    }
    static async getLength() {
        try {
            const [results] = await poolConnection.query(`
        SELECT COUNT(*) count FROM usuarios
        `,)
            return results[0].count
        } catch (error) {
            console.log(error)
        }
    }
    static async aggListPlay(body) {
        try {
            const { idPelicula, idUsrio, fecha } = body
            await poolConnection.query(`INSERT INTO historial_visual (id_pelicula,id_usuario,fecha)
            VALUES (?,?,?)`, [idPelicula, idUsrio, fecha])
        } catch (error) {
            console.log(error)
        }
    }

    static async getFavorites(body) {
       try {
         const { userId } = body
         const [results] = await poolConnection.query(`
         SELECT 
     p.id,
     p.titulo,
     p.img_portada,
     p.descripcion,
     p.lanz,
     p.director,
     c.categoria
 FROM 
     peliculas p
 JOIN 
     favoritas f ON f.id_pelicula = p.id 
 JOIN 
     usuarios u ON f.id_usuario = u.id
 JOIN 
     detalle_peliculas dp ON dp.id_pelicula = p.id 
 JOIN 
     categorias c ON c.id = dp.id_categ 
 WHERE 
     u.id = ?`, [userId])
         return results
       } catch (error) {
        console.log(error)
       }
    }
    static async find(user,email) {
        try {
            const [result] = await poolConnection.query(`
            SELECT * FROM usuarios 
            WHERE usuario = ? OR correo = ? 
            `, [user,email])
            return result
        } catch (error) {
            console.log(error)
        }
    }
    static async findByEmail(email) {
       try {
         const [result] = await poolConnection.query(`
         SELECT id FROM usuarios 
         WHERE correo = ?
         `, [email])
         return result
       } catch (error) {
        console.log(error)
       }
    }
    static async findById(userId) {
        const [result] = await poolConnection.query(`
        SELECT id FROM usuarios 
        WHERE id_usuario = ?
        `, [userId])
        return result
    }
    static async updt(body) {
        try {
            const { contrs, correo, usrio, id } = body
            if (contrs) await poolConnection.query(`UPDATE usuarios SET contrasenia = ? WHERE id = ?`, [contrs, id])
            if (correo) await poolConnection.query(`UPDATE usuarios SET correo = ? WHERE id = ?`, [correo, id])
            if (usrio) await poolConnection.query(`UPDATE usuarios SET usuario = ? WHERE id = ?`, [usrio, id])
        } catch (error) {
            console.log(error)
        }
    }
    static updtPass(contrs, id) {
        try {
            if (contrs) poolConnection.query(`UPDATE usuarios 
            SET contrasenia = ?
             WHERE id = ?`, [contrs, id])
        } catch (error) {
            console.log(error)
        }
    }
    static async verifyView(idMovie, idUser, fecha) {
        const [results] = await poolConnection.query(`
        SELECT * FROM historial_visual
        WHERE id_pelicula = ? AND id_usuario = ? AND fecha = ?`, [idMovie, idUser, fecha])
        return results
    }
    static async aggView(body) {
        try {
            const { userId, movieId, date } = body
            await poolConnection.query(`
            INSERT INTO historial_visual 
            (id_usuario,id_pelicula,fecha)
            VALUES (?,?,?)`, [userId, movieId, date])
        } catch (error) {
            console.log(error)
        }
    }
    static async getHistoryViews(userId) {
        try {
            const [results] = await poolConnection.query(`
            SELECT p.id, p.titulo, p.img_portada, 
            DATE_FORMAT(hv.fecha, "%d-%m-%Y") fecha FROM peliculas p 
            JOIN historial_visual hv 
            ON hv.id_pelicula = p.id 
            JOIN usuarios u 
            ON hv.id_usuario = u.id 
            WHERE u.id = ?
            `, [userId])
            return results
        } catch (error) {
            console.log(error)
        }
    }

    static async aggFavorite(body) {
        const { userId, movieId } = body
        await poolConnection.query(`
        INSERT INTO favoritas 
        (id_usuario,id_pelicula)
        VALUES (?,?)`, [userId, movieId])
    }
    static async deltFavorite(body) {
        const { userId, movieId } = body
        await poolConnection.query(`
        DELETE FROM favoritas 
        WHERE id_usuario = ? AND id_pelicula = ?`, [userId, movieId])
    }
    static async verifyFavorite(body) {
       try {
         const { movieId, userId } = body
         const [results] = await poolConnection.query(`
         SELECT * FROM favoritas
         WHERE id_pelicula = ? AND id_usuario = ?`, [movieId, userId])
         return results
       } catch (error) {
        console.log(error)
       }
    }

}

module.exports = Users