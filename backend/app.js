const express = require('express'); 
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
require("dotenv").config();
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const app = express(); 
const PORT = 3001; 

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

var jsonParser = bodyParser.json();

app.use(cors(corsOptions)) // Use this after the variable declaration

const studentSchema = new mongoose.Schema({
    user_id: String,
    user_input: String,
    botResponse: String,
    timeStamp: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

app.post('/saveDB', jsonParser, (req, res)=>{ 
    id=req.body.user_id;
    input=req.body.user_input;
    response=req.body.bot_response;
    console.log(id, response, input);
    const stud = new Student({
        user_id: id,
        user_input: input,
        botResponse: response,
    });
    stud
        .save()
        .then(
            () => console.log("One entry added"), 
            (err) => console.log(err)
        );
	res.status(200); 
	res.send("Welcome to root URL of Server"); 
}); 



app.post('/fetchDB', jsonParser, (req, res)=>{ 
    id=req.body.user_id;
    Student.find({ user_id: id })
    .sort({ timeStamp: -1 })
    .then(students => {
    res.json(students);
    res.status(200); 
    })
    .catch(err => {
      console.error('Error:', err);
    });
	//res.send("Welcome to root URL of Server"); 
});


app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);