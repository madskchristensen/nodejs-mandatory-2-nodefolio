const router = require("express").Router()

const fontAwesomePrefix = "fab"
const namePrefix = "fa"

const skills = [
    {
        title: "Java",
        text: "hmmmm",
        percentProficiency: 50,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "java"
    },
    {
        title: "JavaScript",
        text: "hmmm",
        percentProficiency: 25,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "js"
    },
    {
        title: "Python",
        text: "hmmm",
        percentProficiency: 25,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "python"
    },
    {
        title: "HTML",
        text: "hmmm",
        percentProficiency: 0,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "html5"
    },
    {
        title: "CSS",
        text: "hmmm",
        percentProficiency: 0,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "css3-alt"
    },
    {
        title: "Angular",
        text: "hmmm",
        percentProficiency: 0,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "angular"
    },
    {
        title: "MySQL",
        text: "hmmm",
        percentProficiency: 0,
        hasFontAwesomeIcon: false,
        iconPrefix: undefined,
        iconName: "icon-mysql-alt"
    },
    {
        title: "MongoDB",
        text: "hmmm",
        percentProficiency: 0,
        hasFontAwesomeIcon: false,
        iconPrefix: undefined,
        iconName: "icon-mongodb"
    },
]

router.get("/api/skills", (req, res) => {
    res.send({skills})
})

module.exports = {
    router
}
