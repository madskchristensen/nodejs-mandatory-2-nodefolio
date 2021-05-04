const router = require("express").Router()

const educations = [
    {
        title: "AP Graduate in Computer Science",
        school: "KEA",
        location: "Nørrebro",
        startDate: new Date("2019-08-26").getFullYear(),
        endDate: new Date("2021-10-10").getFullYear(),
        text: "Education centered around OOP programming with Java.\n" +
            "Emphasis on design of software systems using UP or SCRUM and modelling with UML.\n" +
            "3 electives consisting of Node.js, Python and Angular."
    },
    {
        title: "HTX in International Media",
        school: "NEXT Sukkertoppen",
        location: "Valby",
        startDate: new Date("2012-01-01").getFullYear(),
        endDate: new Date("2015-01-01").getFullYear(),
        text: "Higher Technical Examination Programme with a focus on communications theory, through different types of channels.\n" +
            " Web development and programming in Python and C#.\n" +
            "Common subjects such as Danish A, English A and Mathematics B."
    }
]

router.get("/api/educations", (req, res) => {
    res.send( {educations})
})

module.exports = {
    router
}
