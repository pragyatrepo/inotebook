//importing connect function from db.js
const connectToMongo=require('./db');
//importing express
const express = require('express');
connectToMongo();
const app = express();
const port = 5000
//middleware function for parsing incoming json request
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})