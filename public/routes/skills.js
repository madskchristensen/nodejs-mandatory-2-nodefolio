const router = require("express").Router()

const fontAwesomePrefix = "fab"
const namePrefix = "fa"

const skills = [
    {
        title: "Java",
        subtitle: "Primary langauge of the 1st - 3rd semester at KEA with a focus on GRASP.",
        text: "Fullstack and REST applications using Spring Boot\n" +
            "GUI through JavaFX\n " +
            "CRUD operations using MySQL (JDBC)\n" +
            "Small amount of Thread programming\n" +
            "Unit Testing",
        yearsExperience: 3,
        percentageExperience: 30,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "java"
    },
    {
        title: "JavaScript",
        subtitle: "Introduced on the 3rd semester and used in a few Fullstack Java projects\n " +
            "as well as a part of my Node.js and Angular (TypeScript) electives.",
        text: "Node.js\n" +
            "Express\n" +
            "DOM API\n" +
            "jQuery\n" +
            "Promises and asynchronous functions\n" +
            "Socket.io",
        yearsExperience: 1,
        percentageExperience: 10,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "js"
    },
    {
        title: "Python",
        subtitle: "Elective at my current (4th) semester.",
        text: "Webscrapers using Beautiful Soup\n" +
            "Python datamodel (dunder methods)\n" +
            "OOP and functional approaches in Python\n" +
            "Generators, decorators and context-managers",
        yearsExperience: 1,
        percentageExperience: 10,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "python"
    },
    {
        title: "HTML",
        subtitle: "Introduced as part of Java fullstack development.\n" +
            "Also used in my Node.js and Angular elective.",
        text: "",
        yearsExperience: 3,
        percentageExperience: 30,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "html5"
    },
    {
        title: "CSS",
        subtitle: "Introduced with HTML on 3rd semester.",
        text: "Creating my own CSS\n" +
            "Bootstrap",
        yearsExperience: 3,
        percentageExperience: 30,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "css3-alt"
    },
    {
        title: "Angular",
        subtitle: "Elective at my current (4th) semester.",
        text: "CRUD operations using Firebase\n" +
            "Components\n" +
            "Angular Material\n" +
            "Redux\n" +
            "E2E & Unit Testing\n" +
            "Filtering data with pipes",
        yearsExperience: 1,
        percentageExperience: 10,
        hasFontAwesomeIcon: true,
        iconPrefix: fontAwesomePrefix,
        iconName: namePrefix + "-" + "angular"
    },
    {
        title: "MySQL",
        subtitle: "Introduced on the 2nd semester.",
        text: "DDL & DML\n" +
            "ER diagrams\n" +
            "Third Normal Form (3NF)\n" +
            "Usage in conjunction with Node.js or Java",
        yearsExperience: 3,
        percentageExperience: 30,
        hasFontAwesomeIcon: false,
        iconPrefix: undefined,
        iconName: "icon-mysql-alt"
    },
    {
        title: "MongoDB",
        subtitle: "Introduced in Node.js elective.",
        text: "CRUD operations\n" +
            "Usage in conjunction with Node.js",
        yearsExperience: 1,
        percentageExperience: 10,
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
