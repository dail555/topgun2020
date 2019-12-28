const express = require('express')
const app = express()
const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema

const testSchema = new Schema({
    name: {
        type: String,
        
    },
    camelCapp: {
        type: String,
    },
    brokenName: {
        type: Number
    }
},{  versionKey: false , timestamps: true})

const TestCollection = DBCONNECT.model('Tests', testSchema)
const data = new TestCollection({
    name: "Wichaivit Pattaramongkolchai",
    camelCapp: "Hello camel cappital",
    brokenName: 555
})

data.save()
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
        throw error
    })