#What it contains

This project explains the following logic in backend code `Node.js`

* How to get the token from authentication API. Not OAuth standard, rather a simple token authentication. ( `services\feedback.js` )
* How to access information from a API that is protected via Token Authentication ( `services\feedback.js` )
* How to access data from SQL database ( `services\license.js` )
* How to access OAuth 2.0 token. ( `services\shareFileAuth.js` )

# Pre-Requisites

* Node
* Nodemon (optional)

# Download dependencies 

Open cmd prompt and navigate to `Online Portal\api` folder

Type `npm install`

This will download all the dependencies you needed to run the application.

# Edit Port Bindings

Open the file `api/api.js`
Set the port in which the server has to listen in app.Listen() function (Eg: Set port to 3000)

# Run Application

Open cmd prompt and navigate to `Online Portal\api` folder

Type `node api.js` or `nodemon api.js`