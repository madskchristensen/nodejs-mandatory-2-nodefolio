const router = require("express").Router()
const nodemailer = require("nodemailer")
const config = require("../../config.json")

let testAccount;
let transporterDev;
let transporterProd;

// the recipient of emails sent through transporterDev
const recipient = "maller2650@gmail.com";

// -- initializes the prod and dev transporter --
// prod transporter uses sendinblue smtp service and will actually send an email
// dev transporter uses ethereal (nodemailers own testing smtp).
        // This will not send the email, but it can be viewed through the url shown in console
(async function initTransporters() {
    try {
        testAccount = await nodemailer.createTestAccount()

        transporterDev = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        transporterProd = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            secure: false, // sendinblue doesn't state that this needs to be true, so its false
            auth: {
                user: config.sendinblue.email, // sendinblue username
                pass: config.sendinblue.password, // smtp key
            },
        })
    } catch(error) {
        console.log(error)
    }
})()

router.post("/api/contact", (req, res) => {
    console.log(req.body);

    // information to be sent in the email
    async function sendMail(transporter) {
        let info = await transporter.sendMail({
            from: `${req.body.name} ${req.body.email}`, // sender address
            to: recipient, // list of receivers
            subject: `${req.body.subject}`, // Subject line
            text: `${req.body.message}`, // plain text body
        });

        console.log(`Message sent: ${info.messageId}`)

        // if transporter being used is the test transporter, show link to preview on etheral website
        if (transporter === transporterDev) {
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
    }

    // change argument to either transporterDev or transporterProd
    sendMail(transporterProd).catch(console.error)

    res.redirect("/contact")
})

module.exports = {
    router
}
