const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mode: String,
  equipment: [String],
  exercises: [String],
  createdAt: Date,
  updatedAt: Date,
  trainerTips: [String]
})

module.exports = mongoose.model('Workout', workoutSchema)