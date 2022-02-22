const express = require('express');
const app = express();
const port = 5000
const cors = require('cors');

app.use(cors());

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