import mongoose from 'mongoose';

function Connection() {
    const mongoURI = "mongodb+srv://akberoff313:9ZvHxxThglljaB9g@cluster0.m65yrci.mongodb.net/";
    
    mongoose.connect(mongoURI)
    .then(() => console.log("connected"))
    .catch(err => console.log(err))
}


export default Connection;
