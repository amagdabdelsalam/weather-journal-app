// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Start up an instance of app
const app = express()
const PORT = 4000

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))


// Setup Server
app.listen(PORT, () => {
    console.log(`App works on Port: ${PORT}`)
})

// Setup routes
app.get('/getData', (req, res) => {
    // Return projectData Object
    res.send(projectData)
})

app.post('/postData', (req, res) => {
    // Add data to projectData Object
    projectData = req.body
    console.log(req.body);
    res.send({mes:'data recived!'})
})