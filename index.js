import express  from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';
mongoose = require("mongoose");

const app = express();
const endPoints = require("endpoints.js");

app.use(cors())
app.use(urlencoded({extended: false}));
app.use(express.static('public'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
