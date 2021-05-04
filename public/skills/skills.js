(async function getSkills() {
    try {
        const response = await fetch("/api/skills")
        const result = await response.json()

        const skillsContainer = document.getElementById("skills-container")

        /*
        * div: skills-container
        *   div: skill-container
        *       i: class=fontAwesomeIcon
        *       h1: Title
        *       p: text
        *       div: class=progress w-50
        *           div class=progress-bar progress-bar-striped m.m.
        *
        *
        * */
        result.skills.map((skill, i, arr) => {
            const skillDiv = document.createElement("div")
            skillDiv.classList.add("skill-container", "d-flex", "text-center",
                "flex-column", "flex-grow-1", "align-items-center", "p-4")

            let icon = document.createElement("i")

            if (skill.hasFontAwesomeIcon) {
                icon.classList.add(skill.iconPrefix, skill.iconName)
            } else {
                icon.classList.add(skill.iconName)
            }

            const title = document.createElement("h1")
            title.innerText = skill.title
            title.classList.add("blue-header")

            const subtitle = document.createElement("p")
            subtitle.classList.add("text-muted")
            subtitle.innerText = skill.subtitle

            const text = document.createElement("p")
            text.innerText = skill.text
            text.classList.add("lh-lg")


            const progressWrapper = document.createElement("div")
            progressWrapper.classList.add("progress", "w-50")

            const progressBar = document.createElement("div")
            progressBar.classList.add("progress-bar", "progress-bar-striped", "progress-bar-animated")
            progressBar.setAttribute("role", "progressbar")
            progressBar.setAttribute("style", "width: " + skill.percentageExperience + "%")
            progressBar.setAttribute("aria-valuenow", skill.percentageExperience)
            progressBar.setAttribute("aria-valuemin", "0")
            progressBar.setAttribute("aria-valuemax", "100")
            progressBar.innerText = skill.yearsExperience > 1? `${skill.yearsExperience} years` : `${skill.yearsExperience} year`

            progressWrapper.append(progressBar)

            const hr = document.createElement("hr")

            skillDiv.append(icon, title, subtitle, text, progressWrapper)

            skillsContainer.append(skillDiv)

            if (!(arr.length - 1 === i)) {
                skillsContainer.append(hr)
            }
        })
    } catch (error) {
        console.log(error)
    }
})()
