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

            const school = document.createElement("h4")
            school.innerText = education.school + " - " + education.location
            school.classList.add("text-secondary")

            const date = document.createElement("p")
            date.classList.add("project-date", "card-subtitle", "mb-2", "text-muted")
            date.innerText = education.startDate + " - " + education.endDate

            const text = document.createElement("p")
            text.classList.add("mb-5", "text-break", "w-50", "text-center", "lh-lg")
            text.style.textAlign = "justify"
            text.innerText = education.text

            const hr = document.createElement("hr")

            educationDiv.append(title, school, date, text)

            educationsContainer.append(educationDiv)

            if (!(arr.length - 1 === i)) {
                educationsContainer.append(hr)
            }
        })
    } catch (error) {
        console.log(error)
    }
})()
