const poolConnection = require("../database/Conexion")

class Movies {
    static async getAll() {
        try {
            // obtiene todas las peliculas
            const [results] = await poolConnection.query(`
            SELECT p.id, p.titulo, p.descripcion
            ,DATE_FORMAT(p.lanz, '%d-%m-%Y') lanz
            ,p.director, c.categoria, p.img_portada
            FROM peliculas p
            JOIN detalle_peliculas dp ON dp.id_pelicula = p.id 
            JOIN categorias c ON c.id = dp.id_categ 
            `)
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async getLength() {
        try {
            const [results] = await poolConnection.query(`
        SELECT COUNT(*) count FROM peliculas
        `,)
            return results[0].count
        } catch (error) {
            console.log(error)
        }
    }
    static async getReleases() {
        try {
            const [results] = await poolConnection.query(`
        SELECT p.id, p.titulo, p.descripcion, 
        DATE_FORMAT(p.lanz, '%d-%m-%Y') lanz
        ,p.director, c.categoria, p.url, p.img_portada
        FROM peliculas p
        JOIN detalle_peliculas dp ON dp.id_pelicula = p.id 
        JOIN categorias c ON c.id = dp.id_categ 
        ORDER BY p.lanz DESC LIMIT 8
        `)
            return results
        } catch (error) {
            console.log(error)
        }
    }
    
    static async findByCateg(categ) {
        try {
            const [results] = await poolConnection.query(`
        SELECT p.id, p.titulo, p.descripcion,p.director
        ,DATE_FORMAT(p.lanz, '%d-%m-%Y') lanz
        ,c.categoria, p.url, p.img_portada
        FROM peliculas p
        JOIN detalle_peliculas dp ON dp.id_pelicula = p.id 
        JOIN categorias c ON c.id = dp.id_categ 
        WHERE c.categoria = ?
        `, [categ])
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async getImgsByIdMovie(id) {
        try {
            const [results] = await poolConnection.query(`
        SELECT ip.url_img FROM peliculas p
        JOIN imgs_peliculas ip ON ip.id_pelicula = p.id 
        JOIN detalle_peliculas dp ON dp.id_pelicula = p.id
        JOIN categorias c ON dp.id_categ = c.id
        WHERE p.id = ?
        `, [id])
            return results
        } catch (error) {
            console.log(error)
        }
    }

    static async findById(idMovie) {
        try {
            const [results] = await poolConnection.query(`
            SELECT p.id, p.titulo, p.descripcion,
            p.director,p.img_portada,
            p.url, DATE_FORMAT(p.lanz, '%d-%m-%Y') lanz
            , c.categoria
             FROM peliculas p
            JOIN detalle_peliculas dp ON dp.id_pelicula = p.id 
            JOIN categorias c ON c.id = dp.id_categ 
            WHERE p.id = ?
        `, [idMovie])
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async verifyExist(tit) {
        try {
            const [results] = await poolConnection.query(`
        SELECT * FROM peliculas 
        WHERE titulo = ?
        `, [tit])
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async update(body) {
        try {
            const { idMovie, tit, descp, lanz, categ, nombreDir, apellDir, url, imgPortd, director } = body
            if (tit) await poolConnection.query(`UPDATE peliculas SET titulo = ? WHERE id = ?`, [idMovie])
            if (descp) await poolConnection.query(`UPDATE peliculas SET descripcion = ? WHERE id = ?`, [idMovie])
            if (url) await poolConnection.query(`UPDATE peliculas SET url = ? WHERE id = ?`, [url, idMovie])
            if (imgPortd) await poolConnection.query(`UPDATE peliculas SET img_portada = ? WHERE id = ?`, [imgPortd, idMovie])
            if (lanz) await poolConnection.query(`UPDATE peliculas SET lanz = ? WHERE id = ?`, [lanz, idMovie])
            if (categ) await poolConnection.query(`UPDATE detalle_peliculas SET id_categ = 
        (SELECT id FROM categorias WHERE categoria = ?) WHERE id_pelicula = ?`, [categ, idMovie])
            if (director) await poolConnection.query(`UPDATE peliculas SET director = ? WHERE id = ?`, [director, idMovie])

            if (nombreDir && apellDir) await poolConnection.query(`UPDATE detalle_peliculas SET id_director = (
            SELECT id FROM directores WHERE nombres = ? AND apellidos = ?
        ) WHERE id = ?`, [nombreDir, apellDir, idMovie])
        } catch (error) {
            console.log(error)
        }
    }
    static async regMovie(body) {
        try {
            const { titulo, descripcion, categ, director, lanz, url, imgPortd } = body;

            await poolConnection.query(`INSERT INTO peliculas 
        (titulo,descripcion,lanz,url,img_portada,director) VALUES (?,?,?,?,?,?)`, [titulo, descripcion, lanz, url, imgPortd, director])

            await poolConnection.query(`INSERT INTO detalle_peliculas 
        (id_pelicula,id_categ) VALUES (LAST_INSERT_ID(),
        (SELECT id FROM categorias WHERE categoria = ?))`, [categ])
        } catch (error) {
            console.log(error)
        }
    }
    static async regImgs(url) {
        try {
            await poolConnection.query(`INSERT INTO imgs_peliculas (id_pelicula,url_img) 
            VALUES ((SELECT id FROM peliculas ORDER BY id DESC LIMIT 1),?)
            `, [url])
        } catch (error) {
            console.log(error)
        }
    }
    static async updateImgs(url, id) {
        try {
            await poolConnection.query(`UPDATE imgs_peliculas SET url_img = ? 
            WHERE id_pelicula = ?`, [url, id])
        } catch (error) {
            console.log(error)
        }
    }
}

class Categorys {
    static async get() {
        try {
            const [results] = await poolConnection.query(`
            SELECT * FROM categorias  
            `)
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async verifyExist(categ) {
        try {
            const [results] = await poolConnection.query(`
        SELECT * FROM categorias  
        WHERE categoria = ?
        `, [categ])
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async findById(id) {
        try {
            const [results] = await poolConnection.query(`
        SELECT * FROM categorias  
        WHERE id = ?
        `, [id])
            return results
        } catch (error) {
            console.log(error)
        }
    }
    static async findById(id) {
        try {
            const [results] = await poolConnection.query(`
        SELECT * FROM categorias  
        WHERE id = ?
        `, [id])
            return results
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = { Movies, Categorys }
