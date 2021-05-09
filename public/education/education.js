(async function getEducation() {
    try {
        const response = await fetch("/api/educations")
        const result = await response.json()

        const educationsContainer = document.getElementById("educations-container")

        result.educations.map((education, i, arr) => {
            const educationDiv = document.createElement("div")
            educationDiv.classList.add("education-container", "d-flex", "text-center",
                "flex-column", "flex-grow-1", "align-items-center", "p-4")

            const title = document.createElement("h1")
            title.innerText = education.title
            title.classList.add("blue-header")

            const schoolDateWrapper = document.createElement("div")
            schoolDateWrapper.id = "schoolDateWrapper"
            schoolDateWrapper.classList.add("p-0", "mb-4")

            const school = document.createElement("h4")
            school.innerText = education.school + " - " + education.location
            school.classList.add("lead", "fs-5", "text-muted")

            const date = document.createElement("p")
            date.classList.add("project-date", "card-subtitle", "text-muted")
            date.innerText = education.startDate + " - " + education.endDate

            schoolDateWrapper.append(school, date)

            // MAIN TEXT //
            const textUl = document.createElement("ul")
            textUl.classList.add("w-50", "lh-lg", "list-group")

            // split text into array
            const textLines = education.text.split(/\r\n|\n\r|\n|\r/)

            textLines.forEach(line => {
                const li = document.createElement("li")
                li.innerText = line
                li.classList.add("list-group-item")

                textUl.append(li)
            })

            const hr = document.createElement("hr")

            educationDiv.append(title, schoolDateWrapper, textUl)

            educationsContainer.append(educationDiv)

            if (!(arr.length - 1 === i)) {
                educationsContainer.append(hr)
            }
        })
    } catch (error) {
        console.log(error)
    }
})()
