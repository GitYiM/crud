//对db.json文件中存储数据 操作进行封装
const dbPath = 'db.json';
const fs = require('fs');

//获取学生列表
exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students);
    })
}

//添加保存学生
exports.add = function(stu,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        let info = JSON.parse(data).students;
        stu.id = info[info.length-1].id+1;
        info.push(stu);
        let fileData = JSON.stringify({
            students:info
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                 return callback(err);
            }
            callback(null);
            console.log('保存成功');
        })
    })
}

exports.edit = function(stu,callback){
    let id = stu.id;
    console.log('type--'+typeof id);
    fs.readFile('db.json','utf8',function(err,data){
        if(err){
            return callback(err);
        }
        let students = JSON.parse(data).students;
        let student = students.find(item=>{return item.id == id});
        //对象的循环拷贝
        for(key in stu){
            student[key] = stu[key]
        };
        // students.map(item=>{
        //     if(item.id===id){
        //         return student;
        //     }
        // })
        let fileData = JSON.stringify({
            students:students
        });
        fs.writeFile('db.json',fileData,function(err){
            if(err){
                callback(err);
            }
            callback(null);
        });
        
    })
}

exports.delete =function(id,callback){
    fs.readFile('db.json',function(err,data){
        if(err){
            callback(err);
        }
        let students = JSON.parse(data).students;

        let deletePos = students.findIndex(item=>item.id === parseInt(id));
        console.log(deletePos);
        students.splice(deletePos,1);
        let fileData = JSON.stringify({
            students:students
        });
        fs.writeFile('db.json',fileData,function(err){
            if(err){
                callback(err)
            }
            callback(null);
        })
    })
}

