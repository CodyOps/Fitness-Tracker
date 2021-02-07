//bring in the models directory
const db = require("../models");

module.exports = function (app) {
  //get the workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
          var total = 0;
          workout.exercises.forEach((event) => {
            total += event.duration;
          });
          workout.totalDuration = total;
        });

        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // add a workout
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      },
      { new: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //create a workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // get workouts in range
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
