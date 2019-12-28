const DiabeticModel = require("./diabetic")

let insert = (data) => {
    console.log(data)
    const obj = new DiabeticModel(data)
    obj.save()
        .then((res) => {
            console.log('Insert data in diabetic collection')
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
}

let search = async(cond) => {
    console.log(cond)
    const obj = await DiabeticModel.findOne(cond,(err,res)=>{
        if (err){
            console.log("Cannot search doc")
            throw err
        }
        console.log("Search success.")
    })
    return obj
}

let update = async(cond,data) => {
    console.log(data)
    await DiabeticModel.findOneAndUpdate(cond, data, (err,res)=>{
        if(err){
            console.log("Cannot update doc")
            throw err
        }
        console.log("Update success")
    })
}

let updateSugar = async(cond,data) => {
    console.log(data)
    DiabeticModel.findOneAndUpdate(cond,{$push:{"timestamps": data}}, (err,res)=>{
        if(err){
            console.log("Cannot update doc")
            throw err
        }
        console.log("Update success")
    })
}

let deleteDoc = async(cond) => {
    console.log(cond)
    DiabeticModel.remove(cond,(err,res)=>{
        if(err){
            console.log("Cannot delete doc")
            throw err
        }
        console.log("Delete success")
    })
    
}

var crud = {
    doInsert: insert,
    doSearch: search,
    doUpdate: update,
    doUpdateSugar: updateSugar,
    doDelete: deleteDoc
}

module.exports = crud