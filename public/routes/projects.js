const router = require("express").Router()

/*
    Project Schema
    Title (string)
    Description (string)
    startDate (date)
    endDate (date)
    language(s) (array)
    tech used (array)
    image (string)
    hostedlink (string)
    gitlink (string)
 */

function getFormattedDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return day + "/" + month + "/" + year
}

const projects = [
    {
        title: "Nodefolio",
        description: "Personal portfolio implemented in Node.js. This was the second mandatory project I did for my Node.js elective.",
        startDate: getFormattedDate(new Date("2021-04-08")),
        endDate: getFormattedDate(new Date("2021-05-09")),
        languages: ["HTML", "CSS", "JavaScript"],
        tech: ["Node.js", "Express", "Bootstrap", "Nodemailer", "Toastr"],
        images: [],
        hostedLink: "",
        gitLink: "https://github.com/madskchristensen/Kea_DAT_Node_2021_SPRING/tree/main/1/0._Misc/5._Nodefolio"
    },
    {
    title: "Nodefolio",
    description: "Personal portfolio implemented in Node.js",
    startDate: getFormattedDate(new Date("2021-04-08")),
    endDate: getFormattedDate(new Date("2021-05-09")),
    languages: ["HTML", "CSS", "JavaScript"],
    tech: ["Node.js", "Express", "Bootstrap", "Nodemailer", "Toastr"],
    images: [],
    hostedLink: "",
    gitLink: "https://github.com/madskchristensen/Kea_DAT_Node_2021_SPRING/tree/main/1/0._Misc/5._Nodefolio"
    }
]

router.get("/api/projects", (req, res) => {
    res.send({projects})
})

module.exports = {
    router
}
