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
    _date: {
        type: Date,
        required: true
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
      }
});

exerciseSchema.virtual('date').get(function() {
    return this._date.toDateString();
  });

const Exercise = db.model("Exercise", exerciseSchema);

const userSchema = new db.Schema({
    username: {
        type: String,
        required: true
    }
});

userSchema.virtual('log', {
    ref:'Exercise',
    localField: '_id',
    foreignField: 'user'
})

userSchema.virtual('count').get(function () {
    return this.log?.length ?? 0;
  });
  
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
exerciseSchema.set('toObject', { virtuals: true });
exerciseSchema.set('toJSON', { virtuals: true });

const User = db.model("User", userSchema);

export { Exercise, User };