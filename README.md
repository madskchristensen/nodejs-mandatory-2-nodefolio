# nodejs-mandatory-2-nodefolio
Portfolio created in Node.js using Express for Node.js elective.

## Set-up
1. run "npm install" to get nessecary node modules.
2. (only needed if contact form should send emails)
   1. Copy the content of config-example.json and paste it into a file named config.json, and place it in the root directory of the project. 
   2. Currently the mailing module is configured to use sendinblue, so the email and password field in the config.json file should contain the email and password for your sendinblue account. This needs to be your own account.
   3. On line 65 of "public/routes/contact.js" pass "transporterProd" instead of "transporterDev" to the sendMail() function

## Run
npm run start

##### Uses: Node.js, Express, nodemailer, toastr, bootstrap5

## Demo
https://nodefolio-deploy.herokuapp.com/
