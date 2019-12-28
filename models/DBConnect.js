const DBCONNECT = require('mongoose')
const URL = 'mongodb://192.168.56.101:27017/ElderMornitoring'
const OPTIONS = {
    user: 'topgun',
    pass: '12345678',
    useNewUrlParser: true,
    useUnifiedTopology: true
};
DBCONNECT.connect(URL, OPTIONS, (err, result) => {
    if (err) {
        console.log('Cannot connect to mongoDB')
        throw err
    }
    console.log('Connected to database')
})
//..
module.exports = DBCONNECT