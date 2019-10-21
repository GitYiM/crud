const Schema = require('./schemas')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbstart',{});
const db = mongoose.connection;

db.once('open',function(){
    console.log('数据库连接成功')
})
const stuSchema = new mongoose.Schema(Schema.stuSchema);

const Student = mongoose.model('Student',stuSchema);
// Student.find(function(err,data){
//     if(err){
//         console.log('失败')
//     }else{
//         console.log(data)
//         console.log('读取成功')
//     }
// })

module.exports = Student;