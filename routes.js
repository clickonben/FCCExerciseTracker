import db from './database.js';
import express  from 'express';
import bodyparser from 'body-parser';
import path from 'path';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(bodyparser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    const date = req.body.date ?? new Date();
    const exercise = await db.createExercise(req.params._id, req.body.description, req.body.duration, date);
    res.json(exercise); 
})  

app.route('/api/users/').post( async (req, res) => {
    const user = await db.createUser(req.body.username);
    res.json(user);  
}).get(async (req, res) => {
    const users = await db.getUsers();
    res.json(users);
})

app.get('/api/users/:_id/logs', async (req, res) => {
    const user = await db.getExcercisesForUser(req.params._id, req.body.from, req.body.to, req.body.limit);
    res.json(user);    
})

export default app;

