require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const routes = require('./src/routes');
const DB =require('./src/config/db/index');

//Connect MongoDB

DB.connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})