import dbAccess from './data_access.js';
import express  from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
//const _dirname = path.dirname(new URL(import.meta.url).pathname);

const filePath = fileURLToPath(import.meta.url);
const _dirname = path.dirname(filePath);


app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/views/index.html')
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    const date = req.body.date ?? new Date();
    const user = await dbAccess.createExercise(req.params._id, req.body.description, req.body.duration, date);
    res.json(user.toJSON({ virtuals: true })); 
})  

app.route('/api/users/').post( async (req, res) => {
    const user = await dbAccess.createUser(req.body.username);
    res.json(user);  
}).get(async (req, res) => {
    const users = await dbAccess.getUsers();
    res.json(users.map(user => user.toJSON({ virtuals: true })));
})

app.get('/api/users/:_id/logs', async (req, res) => {
    const user = await dbAccess.getExercisesForUser(req.params._id, req.query.from, req.query.to, req.query.limit);
    res.json(user.toJSON({ virtuals: true }));    
})

export default app;

