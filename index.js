import express  from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();

app.use(cors())
app.use(express.static('public'))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});
app.use('/', routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
