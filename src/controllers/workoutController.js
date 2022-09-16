const workoutService = require("../services/workoutService");
const WorkoutModel = require('../models/workout');

const getAllWorkouts = (req, res) => {
  try {
    const allWorkouts = workoutService.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
  } catch (err) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
}

const getOneWorkout = (req, res) => {
  const {
    params: {workoutId}
  } = req;

  if(!workoutId) {
    res
    .status(400)
    .send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({ status: "OK", data: workout });
  } catch (err) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }

}

const createNewWorkout = async (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res
    .status(400)
    .send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }
  const newWorkout = new WorkoutModel({
    ...body,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "America/Lima" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/Lima" }),
  });
  await WorkoutModel
    .exists({ name: 'Tommy V'})
    .then((result ) => console.log('find', result))
    .catch(err => console.log(err))

  // await newWorkout
  //   .save()
  //   .then((result) => console.log(result))
  //   .catch(err => console.log(err))
  // const newWorkout = {
  //   name: body.name,
  //   mode: body.mode,
  //   equipment: body.equipment,
  //   exercises: body.exercises,
  //   trainerTips: body.trainerTips,
  // };
  // try {
  //   const createdWorkout = workoutService.createNewWorkout(newWorkout);
  //   res.status(201).send({ status: "OK", data: createdWorkout });
  // } catch (error) {
  //   res
  //     .status(error?.status || 500)
  //     .send({ status: "FAILED", data: { error: error?.message || error } });
  // }
}

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
    .status(400)
    .send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({
      status: "FAILED",
      data: { error: error?.message || error }
    });
  }

}

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({ status: "FAILED", data: { error: "Parameter ':workoutId' can not be empty"}})
  }
  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({
      status: "FAILED",
      data: { error: error?.message || error}
    })
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
}