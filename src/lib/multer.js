const multer = require("multer")
const { join, extname } = require("path")


class Multer {
    static uploadFile() {
        // configuracion para subir archivos al servidor
        const storage = multer.diskStorage({
            destination: join(__dirname, "../../public/imgmovies"),
            filename: (req, file, cb) => {
                if (file.mimetype.includes("image")) {
                    const uid = Date.now().toString(36)
                    const ext = extname(file.originalname)
                    const fileName = uid + ext
                    cb(null, fileName)
                }
            }
        })
        return multer({ storage })
    }
}

module.exports = { Multer }