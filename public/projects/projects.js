// utility method to set multiple attributes at once
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

(async function getProjects() {
    try {
        const response = await fetch('/api/projects')
        const result = await response.json()

        const projectsDiv = document.getElementById("projects")

        result.projects.map((project, i, arr) => {
            const projectDiv = document.createElement("div")
            projectDiv.classList.add( "project", "mt-4")

            const title = document.createElement("h1")
            title.innerText = project.title
            title.classList.add("blue-header")

            const date = document.createElement("p")
            date.innerText = project.startDate + " - " + project.endDate
            date.classList.add("text-muted")

            const description = document.createElement("p")
            description.innerText = project.description

            const languages = document.createElement("p")
            languages.innerText = project.languages

            const tech = document.createElement("p")
            tech.innerText = project.tech

            const github = document.createElement("a")
            github.classList.add("fw-bold")
            github.href = project.gitLink
            github.innerText = "GitHub"

            projectDiv.append(title, date, description, languages, tech, github)

            projectsDiv.append(projectDiv)

            // get title with no spaces. Used to refer to each modal and carousel uniquely
            // by "modal" or "carousel" + project title
            const titleNoSpaces = project.title.split(" ").join("")

            // image gallery div containing all images
            const gallery = document.createElement("div")
            gallery.classList.add("gallery", "d-flex", "justify-content-center", "flex-wrap", "pb-3")
            setAttributes(gallery,
                {
                    "data-bs-toggle": "modal",
                    "data-bs-target": "#modal" + titleNoSpaces
                })

            // easier than typing project.imageRoot multiple times
            const imageRoot = project.imageRoot

            // loop through images in each project and process them
            // so they work with carousel and finally append them to gallery
            project.images.forEach((image, i) => {
                console.log("Processing image", i + " with path:", imageRoot + image)
                console.log()

                const img = document.createElement("img")
                setAttributes(img,
                    {
                        "src": imageRoot + image,
                        "data-bs-target": "#carousel" + titleNoSpaces,
                        "data-bs-slide-to": i
                    })
                gallery.append(img)
            })

            // append gallery to the surrounding project div
            projectDiv.append(gallery)

            // create hr element to separate projects, unless project is last
            if (!(arr.length - 1 === i)) {
                const hr = document.createElement("hr")
                projectDiv.append(hr)
            }

            // MODAL MARKUP //

            // modal
            const modal = document.createElement("div")
            modal.classList.add("modal", "fade")
            modal.id = "modal" + titleNoSpaces
            setAttributes(modal,
                {
                    "tabindex": "-1",
                    "role": "dialog",
                    "aria-hidden": "true"
                })

            // modal dialog
            const modalDialog = document.createElement("div")
            modalDialog.classList.add("modal-dialog", "modal-xl")
            modalDialog.setAttribute("role", "document")

            // modal content
            const modalContent = document.createElement("div")
            modalContent.classList.add("modal-content")

            // modal header with close button and title of project
            const modalHeader = document.createElement("div")
            modalHeader.classList.add("modal-header")

            const closeButton = document.createElement("button")
            closeButton.classList.add("btn-close")
            setAttributes(closeButton,
                {
                    "type": "button",
                    "data-bs-dismiss": "modal",
                    "aria-label": "Close"
                })

            const modalTitle = document.createElement("h5")
            modalTitle.innerText = project.title
            modalTitle.classList.add("text-secondary")

            modalHeader.append(modalTitle)
            modalHeader.append(closeButton)

            // modal body
            const modalBody = document.createElement("div")
            modalBody.classList.add("modal-body", "m-0", "p-0")

            // CAROUSEL MARKUP

            // carousel
            const carousel = document.createElement("div")
            carousel.id = "carousel" + titleNoSpaces
            carousel.classList.add("carousel", "slide")
            carousel.setAttribute("data-bs-ride", "carousel")

            // carousel inner
            const carouselInner = document.createElement("div")
            carouselInner.classList.add("carousel-inner")

            // carousel items. Created by iterating images in each project
            project.images.forEach((image, i) => {
                const carouselItem = document.createElement("div")
                carouselItem.classList.add("carousel-item")

                const img = document.createElement("img")
                img.classList.add("d-block", "w-100")
                img.setAttribute("src", imageRoot + image)

                // one item in carousel needs to be active. Set first item to be active.
                if (i === 0) {
                    carouselItem.classList.add("active")
                }

                // append images to wrapping carouselItem and append wrapping item to the inner div of carousel
                carouselItem.append(img)
                carouselInner.append(carouselItem)
            })

            // CAROUSEL CONTROLS //

            // carousel back button control
            const carouselControlPrev = document.createElement("a")
            carouselControlPrev.classList.add("carousel-control-prev")
            setAttributes(carouselControlPrev,
                {
                    "href": "#carousel" + titleNoSpaces,
                    "role": "button",
                    "data-bs-slide": "prev"
                })

            // carousel back button icon
            const carouselBackIcon = document.createElement("span")
            carouselBackIcon.classList.add("carousel-control-prev-icon")
            carouselBackIcon.setAttribute("aria-hidden", "true")

            // carousel screen reader only span
            const carouselBackSrOnly = document.createElement("span")
            carouselBackSrOnly.classList.add("sr-only")
            carouselBackSrOnly.innerText = "Previous"

            // append back icon and sr only to control
            carouselControlPrev.append(carouselBackIcon)
            carouselControlPrev.append(carouselBackSrOnly)

            // carousel forward button control
            const carouselControlNext = document.createElement("a")
            carouselControlNext.classList.add("carousel-control-next")
            setAttributes(carouselControlNext,
                {
                    "href": "#carousel" + titleNoSpaces,
                    "role": "button",
                    "data-bs-slide": "next"
                })

            // carousel back button icon
            const carouselNextIcon = document.createElement("span")
            carouselNextIcon.classList.add("carousel-control-next-icon")
            carouselNextIcon.setAttribute("aria-hidden", "true")

            // carousel screen reader only span
            const carouselNextSrOnly = document.createElement("span")
            carouselNextSrOnly.classList.add("sr-only")
            carouselNextSrOnly.innerText = "Next"

            // APPEND EVERYTHING //

            // append back icon and sr only to control
            carouselControlNext.append(carouselNextIcon)
            carouselControlNext.append(carouselNextSrOnly)

            // append inner of carousel and controls to carousel
            carousel.append(carouselInner, carouselControlPrev, carouselControlNext)

            // append carousel to modal body
            modalBody.append(carousel)

            // append modal body and header to modal content
            modalContent.append(modalHeader, modalBody)

            // append content of modal to model dialog
            modalDialog.append(modalContent)

            // append model dialog containing the header and content to the modal div
            modal.append(modalDialog)

            projectsDiv.append(modal)
        })
    } catch (err) {
        console.log(err)
    }
})()

/*(async function getProjects() {
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

            // images

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
})()*/
