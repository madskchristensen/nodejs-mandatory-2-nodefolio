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

const imageRoot = "../img"

const projects = [
    {
        title: "Nodefolio",
        description: "Personal portfolio implemented in Node.js. This was the second mandatory project I did for my Node.js " +
            "elective and is the website that you are currently browing.",
        startDate: getFormattedDate(new Date("2021-04-08")),
        endDate: getFormattedDate(new Date("2021-05-09")),
        languages: ["HTML", "CSS", "JavaScript"],
        tech: ["Node.js", "Express", "Bootstrap", "Nodemailer", "Toastr"],
        imageRoot: imageRoot + "/nodefolio/",
        images: ["home.png", "skills.png", "contact.png"],
        hostedLink: "",
        gitLink: "https://github.com/madskchristensen/nodejs-mandatory-2-nodefolio"
    },
    {
    title: "Nordic Motorhome Project",
    description: "My 2nd semester exam project. A website coded in Java and utilizing Spring Boot to create a Fullstack application." +
        "The website allows you to log in and book a fictional motorhome for your fictional vacation." +
        "The application is backed by a MySQL database which makes it possible to save bookings " +
        "and check to see if a desired booking date is available for a specific motorhome model.",
    startDate: getFormattedDate(new Date("2021-05-11")),
    endDate: getFormattedDate(new Date("2020-06-04")),
    languages: ["Java", "HTML", "CSS"],
    tech: ["Spring Boot", "Spring Security", "Spring Web", "Tymeleaf", "JDBC", "Bootstrap", "jQuery"],
    imageRoot: imageRoot + "/nordicmotorhome/",
    images: ["booking-1.png", "booking-2.png", "booking-3.png", "booking-4.png", "booking-5.png", "booking-6.png", "booking-7.png", "bookings.png"],
    hostedLink: "",
    gitLink: "https://github.com/StortM/2-semester-eksamensprojekt"
    }
]

router.get("/api/projects", (req, res) => {
    res.send({projects})
})

module.exports = {
    router
}
