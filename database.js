import { User, Exercise } from 'models.js'

const getUserByName = async (username) => {
    
    try {
        return await User.FindOne({username: username});   
    } catch (error) {
        throw error;
    }    
}

const getUserById = async (userId) => {
    
    try {
        return await User.FindById({username: username});   
    } catch (error) {
        throw error;
    } 
}

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


}

const createUser = async (username) => {
    
    let user = await FindUserByName(username);
    if (user != null) {
        throw new Error(`A User with the username ${username} already exists.`)
    };

    user = new User({
        username: username
    });

    return user.save();    
}

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
}

export default db = { 
    getExcercisesForUser: getExcercisesForUser, 
    getUserById: getUserById,
    getUserByName: getUserByName,
    createExercise: createExercise,
    createUser: createUser
};


