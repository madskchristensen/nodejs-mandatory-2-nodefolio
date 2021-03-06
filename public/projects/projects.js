// utility method to set multiple attributes at once
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/
(async function getProjects() {
    try {
        const response = await fetch('/api/projects')
        const result = await response.json()

        const projectsDiv = document.getElementById("projects")

        // Iterate projects from api
        result.projects.map((project, i, arr) => {
            // get title with no spaces. Used to refer to each modal and carousel uniquely
            // by "modal" or "carousel" + project title and to set id of projectDiv
            const titleNoSpaces = project.title.split(" ").join("")
            // PROJECT DIV //
            const projectDiv = document.createElement("div")
            projectDiv.id = titleNoSpaces[0].toLowerCase() + titleNoSpaces.substring(1)
            projectDiv.classList.add("mt-4", "text-center")

            const title = document.createElement("h1")
            title.innerText = project.title
            title.classList.add("blue-header")

            const date = document.createElement("p")
            date.innerText = project.startDate + " - " + project.endDate
            date.classList.add("text-muted")

            const descWrapper = document.createElement("div")
            descWrapper.id = "descWrapper"
            descWrapper.classList.add("d-flex", "flex-column", "align-items-center", "mt-4", "mb-2")

            const descTitle = document.createElement("h4")
            descTitle.classList.add("lead")
            descTitle.innerText = "Description"

            const description = document.createElement("p")
            description.id = "description"
            description.classList.add("text-break")
            description.innerText = project.description

            descWrapper.append(descTitle)
            descWrapper.append(description)

            // LANGUAGES //
            const langWrapper = document.createElement("div")
            langWrapper.id = "langWrapper"
            langWrapper.classList.add("mb-2")

            const langTitle = document.createElement("h4")
            langTitle.classList.add("lead")
            langTitle.innerText = "Languages"

            const languages = document.createElement("p")
            languages.innerText = project.languages.join(", ")

            langWrapper.append(langTitle, languages)

            // TECH //
            const techWrapper = document.createElement("div")

            const techTitle = document.createElement("h4")
            techTitle.classList.add("lead")
            techTitle.innerText = "Tech"

            const tech = document.createElement("p")
            tech.innerText = project.tech.join(", ")

            techWrapper.append(techTitle, tech)

            // GITHUB //
            const githubLink = document.createElement("a")
            githubLink.href = project.gitLink
            githubLink.target = "_blank"
            githubLink.rel = "noopener noreferrer"

            const githubButton = document.createElement("button")
            githubButton.classList.add("btn", "btn-outline-primary", "m-3")
            githubButton.textContent = "View on GitHub"
            githubLink.append(githubButton)

            projectDiv.append(title, date, descWrapper, langWrapper, techWrapper, githubLink)

            projectsDiv.append(projectDiv)

            const galleryWrapper = document.createElement("div")
            galleryWrapper.id = "galleryWrapper"
            galleryWrapper.classList.add("text-center")

            const gallerySubtitle = document.createElement("p")
            gallerySubtitle.classList.add("fst-italic", "fs-6", "mt-3", "mb-1")
            gallerySubtitle.innerText = "Click each image for a bigger version"

            galleryWrapper.append(gallerySubtitle)

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
                img.src = imageRoot + image
                setAttributes(img,
                    {
                        "data-bs-target": "#carousel" + titleNoSpaces,
                        "data-bs-slide-to": i
                    })
                img.classList.add("mx-2", "mb-2")

                gallery.append(img)
            })

            // append gallery to the surrounding project div
            galleryWrapper.append(gallery)
            projectDiv.append(galleryWrapper)

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
