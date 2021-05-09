    // toastr custom settings
    (() => {
    toastr.options.closeButton = true;
    toastr.options.timeOut = 3000;
    toastr.options.extendedTimeOut = 3000;
    toastr.options.progressBar = true;

    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
})()

    // get form data
    // send it with fetch
    // idea: use toastr for showing the messages
    async function sendFormData() {
    const msgSuccess = "Email sent!"
    const msgError = "Something went wrong. Email not sent."

    // select the form element with dom api
    const formElement = document.getElementById("contact-form")

    // create FormData object and populate it with data from formElement
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const formData = new FormData(formElement)

    // create javascript object with key:value pairs representing form data
    const form = {}
    formData.forEach((value, key) => form[key] = value)

    // use fetch to post the form object to api
    await fetch("/api/contact", {
    headers: {
    "Content-Type": "application/json"
},
    method: "POST",
    body: JSON.stringify(form)

})
    // according to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // fetch will only reject promise if request is not completed or a network failure happens
    // this means http error codes like 404 will still result in a resolved promise
    // res.ok is set to true if http code is within 200-299 range.
    // So a 404 (or other error) will result in ok = false
    .then(res => {
    if (!res.ok) {
    throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`)
}

    toastr.success(msgSuccess)
})
    .catch(err => {
    toastr.error(msgError)
    console.log(err)
})

    resetForm()
}

    function resetForm() {
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("subject").value = ""
    document.getElementById("message").value = ""
}
