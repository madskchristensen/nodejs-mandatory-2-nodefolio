// fetch("/api/projects").then(res => res.json()).then(console.log)

(async function getProjects() {
    try {
        const response = await fetch('/api/projects')
        const result = await response.json()

        const projectsDiv = document.getElementById("projects")

        result.projects.map(project => {
            const cardDiv = document.createElement("div")
            cardDiv.classList.add("card")

            const cardBodyDiv = document.createElement("div")
            cardBodyDiv.classList.add("card-body")

            // title
            const titleHeader = document.createElement("h1")
            titleHeader.classList.add("project-title", "card-title")
            titleHeader.innerText = project.title

            // start - end date
            const projectDate = document.createElement("p")
            // project-date card-subtitle mb-2 text-muted
            projectDate.classList.add("project-date", "card-subtitle", "mb-2", "text-muted")
            projectDate.innerText = project.startDate + " - " + project.endDate

            // description
            const descriptionP = document.createElement("p")
            descriptionP.classList.add("project-description", "fs-5")
            descriptionP.innerText = project.description

            // languages
            const projectLanguages = document.createElement("p")
            projectLanguages.classList.add("project-languages", "fs-6")
            projectLanguages.innerText = "Languages: \n" + project.languages.join(", ")

            // tech
            const projectTech = document.createElement("p")
            projectTech.classList.add("project-tech", "fs-6")
            projectTech.innerText = "Technologies: \n" + project.tech.join(", ")

            // github link
            const projectGithub = document.createElement("a")
            projectGithub.classList.add("project-github", "fw-bold")
            projectGithub.href = project.gitLink
            projectGithub.innerText = "GitHub"

            cardBodyDiv.appendChild(titleHeader)
            cardBodyDiv.appendChild(projectDate)
            cardBodyDiv.appendChild(descriptionP)
            cardBodyDiv.appendChild(projectLanguages)
            cardBodyDiv.appendChild(projectTech)
            cardBodyDiv.appendChild(projectGithub)

            cardDiv.appendChild(cardBodyDiv)

            projectsDiv.appendChild(cardDiv)
        })

    } catch (error) {

        console.log(error)
    }
})()

/*
function showProjects() {
    const projects = getProjects().then()

    console.log(projects)

    const containerDiv = document.getElementById("projects-container")

    const newDiv = document.createElement("div")

    const newContent = document.createTextNode(projects)

    newDiv.appendChild(newContent)

    containerDiv.appendChild(newDiv)
}*/
