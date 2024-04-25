import express from "express";
import { PORT, mongoDBURL } from "./config.js"; 
import mongoose from "mongoose";
import UsersRoute from './routes/UsersRoute.js'
import ClubsRoute from './routes/ClubsRoute.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body
app.use(express.json());


//Middleware for handling CORS POLICY

app.use(cors());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to CMW stack Website');
});


app.use('/Users', UsersRoute);
app.use('/Clubs', ClubsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

