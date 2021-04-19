import express from "express";
import mongoose from "mongoose";

// const express = require("express");
// const mongoose = require("mongoose");
// const data = require("./data.js");
// const videos = require("./dbModel.js");


import data from './data.js';
import videos from './dbModel.js';






// app config
const app = express();
const port = process.env.PORT || 9000;


//middlewares

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next();

})


//DB config

const connection_url = "mongodb+srv://admin:6fIXZBnFltWd1TgZ@cluster0.5m9km.mongodb.net/tiktok?retryWrites=true&w=majority";



mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})



// api endpoints


app.get('/', (req,res) =>res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(data));

app.get('/v2/posts', (req,res) => {
    videos.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/v2/posts', (req, res)=> {

    // ADDING DATA TO THE DATABASE
    const dbVideos = req.body;


    videos.create(dbVideos, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//admin mongodb username
//6fIXZBnFltWd1TgZ mongodb password


//listner



app.listen(port, ()=>console.log(`listening on localhost:${port}`));