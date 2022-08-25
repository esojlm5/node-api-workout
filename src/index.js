const express = require("express"); 
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.use(function(req, res, next){
    res.status(404).render('404_error_template', {title: "Sorry, page not found"});
});

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});