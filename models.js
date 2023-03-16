import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  ;
      console.log("connected to database succesfully");
    } catch (error) {
      console.log("failed to connect to database", error);
    }
})();

const exerciseSchema = new mongoose.Schema({    
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
}); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    excercises: [exerciseSchema]
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

export { Exercise, User };