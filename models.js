import db from './db.js'

const exerciseSchema = new db.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
      }
});

const userSchema = new db.Schema({
    username: {
        type: String,
        required: true
    },
    exercises: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
});

const Exercise = db.model("Exercise", exerciseSchema);
const User = db.model("User", userSchema);

export { Exercise, User };