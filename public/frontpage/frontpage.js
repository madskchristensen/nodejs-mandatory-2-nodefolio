(async function getSkillsIcons() {
    try {
        const skills = await fetch("/api/skills")
        const result = await skills.json()

        const ul = document.getElementById("skills")

        result.skills.map(skill => {
            const listElement = document.createElement("li")
            listElement.classList.add("list-inline-item", "me-3")

            const icon = document.createElement("i")
            icon.title = skill.title

            if (skill.hasFontAwesomeIcon) {
                icon.classList.add("fontawesome-icon", skill.iconPrefix, skill.iconName)
            } else {
                icon.classList.add("mfizz-icon", skill.iconName)
            }

            listElement.append(icon)
            ul.append(listElement)
        })
    } catch (err) {
        console.log(err)
    }
})();
