const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static(__dirname+'/views'))
var port = process.env.PORT || 7777
const crudDiabetic = require('./models/crudDiabetic')

const JSON_BANK = {
    nickname: 'Bank',
    fullname: {
        firstname: 'Wichaivit',
        lastname: 'Pattaramngkolchai'
    },
    age: 20
}


app.get('/', (req, res) => {
    res.send("Hello API")
})

app.get('/jsonContent', (req, res) => {
    res.json(JSON_BANK)
})

app.get('/htmlContent', (req, res) => {
    res.sendfile(__dirname + '/views/index.html')
})

app.get('/parameter/:beauty', (req, res) => {
    res.send(req.params.beauty)
})

app.get('/parameter1/:a/:b/:c', (req, res) => {
    res.send(`${req.params.a} ${req.params.b} ${req.params.c}`)
})

app.post('/ex05', (req, res) => {
    console.log(req.body.userID)
    res.send(`${req.body.userID} ${req.body.fullname.firstname} ${req.body.fullname.lastname}`)
})

app.post('/calculater', (req, res) => {
    var operandA = req.body.operandA
    var operandB = req.body.operandB
    var operator = req.body.operator
    var ans = cal(operandA, operandB, operator)
    if (ans === "Error") {
        res.send(500)
    } else {
        res.send(`${operandA} ${operator} ${operandB} = ${ans}`)
    }

})

app.post('/SmartCalculater', (req, res) => {
    var list = []
    var str
    req.body.forEach(data => {
        var Jdata = {}
        var operandA = data.operandA
        var operandB = data.operandB
        var operator = data.operator
        ans = cal(operandA, operandB, operator)
        str = `{"${operandA} ${operator} ${operandB}" : ${ans}}`
        str = JSON.parse(str)
        list.push(str)
    });
    res.json(list)

})
function cal(A, B, op) {
    var ans = 0
    if (op === '+') {
        ans = A + B
    }
    else if (op === '-') {
        ans = A - B
    }
    else if (op === '*') {
        ans = A * B
    }
    else if (op === '/') {
        ans = A / B
    }
    else {
        ans = "Error"
    }
    return ans
}

app.post('/diabetic', (req, res) => {
    crudDiabetic.doInsert(req.body)
    res.sendStatus(201).end()
})
app.get('/diabeticSearch/:cond', (req, res) => {
    var cond = `{"userID" : "${req.params.cond}"}`
    var cond = JSON.parse(cond)
    crudDiabetic.doSearch(cond)
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500).end()
        })
})

app.put('/diabeticUpdate', (req, res) => {
    var cond = `{"userID" : "${req.body.userID}"}`
    var cond = JSON.parse(cond)
    crudDiabetic.doUpdate(cond, req.body)
    res.sendStatus(201).end()
})

app.put('/diabeticUpdateSugar/:userID', (req, res) => {
    var cond = `{"userID" : "${req.params.userID}"}`
    var cond = JSON.parse(cond)
    console.log(cond)
    /*req.body.forEach(data => {
        crudDiabetic.doUpdateSugar(cond,data)
    })*/
    crudDiabetic.doUpdateSugar(cond,req.body)
    res.sendStatus(201).end()
})
app.get('/diabeticDelete/:userID', (req, res) => {
    var cond = `{"userID" : "${req.params.userID}"}`
    var cond = JSON.parse(cond)
    console.log(cond)
    crudDiabetic.doDelete(cond)
    res.sendStatus(201).end()
})

app.get("/welcome",(req,res)=>{
    res.send("Hello")
})

app.listen(port, function (req, res) {
    console.log(`App is running on port ${port}`)
})