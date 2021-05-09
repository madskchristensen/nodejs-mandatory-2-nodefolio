// deadline: May 9th 23:59
// hand-in: fronter -> github link or zip

// todo: Content for ->
// todo:    frontpage, projects, education, recommendations
// todo: lav anders' fix på footer igen?
// todo: Erstat bootstrap carousel med ordentlig slider.. f.eks. https://www.npmjs.com/package/slick-carousel

// todo: ekstra: Override bootstrap default colors? Så den blå matcher header farven
// todo: ekstra: find en måde at fixe mfizz ikoner så de matcher fontawesome på frontpage
// todo: bonus: deploy application

const express = require("express")
const app = express()
let port = process.env.port || 8080;
const fs = require("fs")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const projectsRouter = require(__dirname + "/public/routes/projects.js")
const contactRouter = require(__dirname + "/public/routes/contact.js")
const skillsRouter = require(__dirname + "/public/routes/skills.js")
const educationRouter = require(__dirname + "/public/routes/education.js")

app.use(projectsRouter.router)
app.use(contactRouter.router)
app.use(skillsRouter.router)
app.use(educationRouter.router)

// Server-side rendering
// read the html file as text
// send the text content to the client

// In node there are two ways to read a file
// async : correct 99.9% of the time
// sync  : <- use this here cause it's not a problem that the server is blocked when it starts
// cause we need the html before the routes should be accessible anyway

/* Task */
// serve the frontpage by server-side rendering it

// Main business reason for SSR: SEO (Search engine optimization)
// SSR doesnt slow server down as all pages are loaded synchronously at server start
    // after that you just send the already loaded page to the client

// components
const header = fs.readFileSync(
    __dirname + "/public/header/header.html",
    { encoding: "utf-8" }
)
const footer = fs.readFileSync(
    __dirname + "/public/footer/footer.html",
    { encoding: "utf-8" }
)

// pages
const frontpage = fs.readFileSync(
    __dirname + "/public/frontpage/frontpage.html",
    { encoding: "utf-8" }
)

const projects = fs.readFileSync(
    __dirname + "/public/projects/projects.html",
    { encoding: "utf-8" }
)

const skills = fs.readFileSync(
    __dirname + "/public/skills/skills.html",
    { encoding: "utf-8"}
)

const education = fs.readFileSync(
    __dirname + "/public/education/education.html",
    { encoding: "utf-8"}
)

const recommendations = fs.readFileSync(
    __dirname + "/public/recommendations/recommendations.html",
    { encoding: "utf-8"}
)

const contact = fs.readFileSync(
    __dirname + "/public/contact/contact.html",
    { encoding: "utf-8"}
)

// homemade way of doing templates without the need for template engines
// const basetemplate = fs.readFileSync(__dirname + "/public/basetemplate.html", "utf-8");
// const koalapage = basetemplate.replace("{{BODY}}", frontpage).replace("{{TITLE}}", "Best Koala title ever").replace("{{KOALA_FACT}}", "<h1>Did you know that Koalas are always high and thus black, white and asian.</h1>");

app.get("/", (req, res) => {
    res.send(header + frontpage + footer)
})

app.get("/projects", (req, res) => {
    res.send(header + projects + footer)
})

app.get("/contact", (req, res) => {
    res.send(header + contact + footer)
})

app.get("/skills", (req, res) => {
    res.send(header + skills + footer)
})

app.get("/education", (req, res) => {
    res.send(header + education + footer)
})

app.get("/recommendations", (req, res) => {
    res.send(header + recommendations + footer)
})

// app.get("/koala", (req, res) => {
//     res.send(header + koalapage + footer)
// })

const server = app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Express listening at port", port)
    }
})
