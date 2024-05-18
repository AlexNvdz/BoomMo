
function genHtmlForMail(otp=false) {
    const htmlMails = [
        `
        <div>
          <p>Estimado usuario su codigo OTP es: ${otp}</p>
        </div>
        `,
        `
        <div>
          <p>Le damos la bienvenida a Boommo</p>
        </div>
        `
    ]
    if(otp) return htmlMails[0]
    return htmlMails[1]
    
}

module.exports = {genHtmlForMail}