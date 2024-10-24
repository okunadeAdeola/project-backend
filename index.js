const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.routes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);

mongoose.connect(process.env.MONGOOSE_URI, {
    connectTimeoutMS: 20000, 
    serverSelectionTimeoutMS: 20000,
})
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log("error connecting to MongoDB", err);
    });

// app.listen(PORT, (err) => {
//     if (err) {
//         console.log("server refused to run", err);
//     } else {
//         console.log(`Server is running on port ${PORT}`);
//     }
// });
app.listen(PORT,(err)=>{
    if(err){
        console.log('server refused gto run', err);   
    }else{
        console.log('server running at'+ PORT);
        
    }
})