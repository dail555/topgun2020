const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema

const diabeticSchema = new Schema({
    userID:{
        type: String,
        uppercase: true
    },
    fullname: {
        type: String,
        uppercase: true
    },
    timestamps:[{
        time:{
            type:String,
            uppercase:true
        },
        bloodSugar: {
            type:Number
        },
        detectorLicenseID:{
            type:String,
            uppercase:true
        }
    }]
},{versionKey: false , timestamps: true})

const DiaceticModel = DBCONNECT.model('diabetics', diabeticSchema)
module.exports = DiaceticModel