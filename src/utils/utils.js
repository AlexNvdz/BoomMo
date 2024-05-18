const fs = require("fs")
const dotenv = require("dotenv")
const { join, extname } = require("path")
dotenv.config()

class Utils {
    static listImgsToSave = []
    static alert(msg, title, time, icon, ruta, confirmBtn = 2500) {
        return {
            alert: true,
            alertTitle: title,
            alertMessage: msg,
            alertIcon: icon,
            showConfirmButton: confirmBtn,
            timer: time,
            ruta
        }
    }
    static saveImgs(req, res) {
        const imgs = req.files
        if (imgs.length > 0) {
            imgs.forEach(img => {
                const mimeType = img.mimetype
                if (mimeType.includes("image")) {
                    const orginalName = img.originalname
                    const ext = extname(orginalName)
                    const uid = (Date.now() + Math.random() * 10).toString(36)
                    const fileName = uid + ext
                    this.listImgsToSave.push(fileName)
                    const dir = join(__dirname, "../public", "imgmovies", fileName)
                    fs.writeFileSync(dir, img.buffer)
                }
            });
        }
        return this.listImgsToSave
    }
    static getUrlImg(listFile) {
        const host = process.env.HOST_SERVER
        const port = process.env.PORT || 3000
        const listImgUrl = listFile.map(file => host + ":" + port + "/resources/imgmovies/" + file)
        return listImgUrl
    }
    static genCode() {
        const num1 = Math.round(Math.random() * 900) + 100
        const num2 = Math.round(Math.random() * 900) + 100
        const otp = `${num1}${num2}`
        return otp
    }
}

class UtilsDate {
    static getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
module.exports = { Utils,UtilsDate }