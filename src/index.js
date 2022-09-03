const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  })

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

