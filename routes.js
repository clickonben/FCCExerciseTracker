import dbAccess from './database.js';
import express  from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const _dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/views/index.html')
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    const date = req.body.date ?? new Date();
    const exercise = await dbAccess.createExercise(req.params._id, req.body.description, req.body.duration, date);
    res.json(exercise); 
})  

app.route('/api/users/').post( async (req, res) => {
    const user = await dbAccess.createUser(req.body.username);
    res.json(user);  
}).get(async (req, res) => {
    const users = await dbAccess.getUsers();
    res.json(users);
})

app.get('/api/users/:_id/logs', async (req, res) => {
    const user = await dbAccess.getExercisesForUser(req.params._id, req.body.from, req.body.to, req.body.limit);
    res.json(user);    
})

export default app;

