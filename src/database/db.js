const mongoose = require('mongoose');
require("dotenv").config(); 

mongoose.connect(process.env.MONGODB_URI, () => { console.log("[+] Succesfully connected to database."); });