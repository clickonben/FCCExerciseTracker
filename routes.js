import dbAccess from './data_access.js';
import express  from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filePath = fileURLToPath(import.meta.url);
const _dirname = path.dirname(filePath);

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    try {
        res.sendFile(_dirname + '/views/index.html')   
    } catch (error) {
        next(error);
    }    
});

app.post('/api/users/:_id/exercises', async (req, res, next) => {
    try {
        const date = req.body.date ?? new Date();
        const user = await dbAccess.createExercise(req.params._id, req.body.description, req.body.duration, date);
        
        res.json({
            username: user.username,
            description: user.log[0].description,
            duration: user.log[0].duration,
            date: user.log[0].date,
            _id: user._id
        });   
    } catch (error) {
        next(error);
    }
})  

app.route('/api/users/').post( async (req, res, next) => {
    try {
        const user = await dbAccess.createUser(req.body.username);
        res.json(user);       
    } catch (error) {
        next(error);
    }    
}).get(async (req, res, next) => {
    try {
        const users = await dbAccess.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }   
})

app.get('/api/users/:_id/logs', async (req, res, next) => {
    try {
        const user = await dbAccess.getExercisesForUser(req.params._id, req.query.from, req.query.to, req.query.limit);    
        res.json(user);    
    } catch (error) {
        next(error);
    }       
})

export default app;

