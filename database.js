import { User, Exercise } from './models.js'

const getUserByName = async (username) => {    
    try {
        return await User.findOne({username: username});   
    } catch (error) {
        throw error;
    }    
};

const getExcercisesForUser = async (userId, fromDate, toDate, limit) => {    
    if(!userId) throw new Error("query.userId is required");

    const query = User.findById(userId).populate({
        path: 'exercises',
        options: {}
      });
      
      if (fromDate && toDate) {
        query.populate({
          path: 'exercises',
          match: { date: { $gte: fromDate, $lte: toDate } }
        });
      } else if (fromDate) {
        query.populate({
          path: 'exercises',
          match: { date: { $gte: fromDate } }
        });
      } else if (toDate) {
        query.populate({
          path: 'exercises',
          match: { date: { $lte: toDate } }
        });
      }
      
      if (limit) {
        query.populate({
          path: 'exercises',
          options: { limit }
        });
      }

      return await query.exec();
};

const createUser = async (username) => {    
    let user = await getUserByName(username);
    if (user != null) {
        throw new Error(`A User with the username ${username} already exists.`)
    };

    user = new User({
        username: username
    });

    return await user.save();    
};

const createExercise = async (userId, description, duration, date) => {    
    if(!userId) throw new Error("userId is required");
    if(!description) throw new Error("description is required");
    if(!duration) throw new Error("duration is required");
    if(!date) throw new Error("date is required");

    const exercise = new Exercise({
        user: userId,
        description: description,
        duration: duration,
        date:date
    })

    return await exercise.save();
};

const db = { 
    getExcercisesForUser,     
    createExercise,
    createUser
};

export default db;
