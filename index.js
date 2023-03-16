import express  from 'express';
import cors from 'cors';
import './endpoints.js';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
