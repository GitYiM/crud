const fs = require('fs');
const express = require('express');
const Students  = require('./student');
const Studb = require('./db/connection');
// module.exports = function(app){
//     app.get('/',(req,res)=>{
//         let lists;
//         fs.readFile('db.json',(err,data)=>{
//             if(err){
//                res.status(500).send('Server error');
//             }else{
//                 lists = JSON.parse(data.toString()).students;    
//                 res.render('index.html',{
//                     fruits:["苹果","香蕉","香梨","葡萄"],
//                     lists:lists
//                 })  
//             }   
//         })
              
//     });
//     // app.get('/addStudent',(req,res)=>{
    
//     // })
    
//     app.get('*',(req,res)=>{
//         res.send('404 Not Found');
//     })
// }

//以上方式可用 但是EXPRESS 提供了一种个更好的方式

//创建Router容器
const router = express.Router();

// 挂载路由到Router上

router.get('/',(req,res)=>{


        Studb.find(function(err,data){
            if(err){
                return res.status(500).send('Server error')
            }
            // console.log(data);
            // console.log('查找成功');
            res.render('index.html',{
                lists:data
            })
        })


    //文件API
    // Students.find(function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error')
    //     }
    //     res.render('index.html',{
    //         lists:data
    //     })
    // })


    // fs.readFile('db.json',function(err,data){
    //     if(err){
    //         res.status(500).send('Server error')
    //     }else{
    //         const lists = JSON.parse(data.toString()).students;
    //         res.render('index.html',{
    //             lists:lists
    //         })
    //     }
    // })
})
router.get('/addStudent',(req,res)=>{
  
    res.render('studentAdd.html')
})

router.post('/addStudent',(req,res)=>{
    // console.log(req.body);
    const stu = new Studb({
        sno:req.body.sno,
        name:req.body.name,
        age:parseInt(req.body.age),
        gender:parseInt(req.body.gender),
        hobbies:req.body.hobbies
    });
     stu.save(function(err,ret){
        if(err){
            console.log('添加失败')
            console.log(err);
            res.status(500).send('Server error');
        }else{
            console.log('添加成功')
            res.status(302).redirect('/') 
        }
       
        
    })

    //文件操作
    // Students.add(req.body,function(err){
    //     if(err){
    //         res.status(500).send('Server error');
    //     }
    //     res.status(302).redirect('/')
    // })



    // fs.readFile('db.json',function(err,data){
    //     if(err){
    //         res.status(500).send('Server error');
    //     }else{
    //         let result = JSON.parse(data.toString()).students;
    //         console.log("id为"+ result[result.length-1].id+1);
    //         req.body.id = +result[result.length-1].id+1;
    //         result.push(req.body);
    //         let db = {};
    //         db.students = result;
    //         console.log(db)
    //         fs.writeFile('db.json',JSON.stringify(db),function(err){
    //             if(err){
    //                 console.log('文件写入失败')
    //             }else{
    //                 res.status(302).redirect('/');
    //                 console.log('文件写入成功')
    //             }
    //         })  
    //     }
    // })
})

router.get('/studentEdit',function(req,res){
    // let id = req.query.id;
    let sno = req.query.sno;
    console.log(sno);
    let stu = {};
    Studb.findOne({sno:sno},function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('Server error')
        }else{
            console.log('编辑对象')
            console.log(data);
            stu.sno = data.sno
            stu.name = data.name
            stu.age = data.age
            stu.gender = data.gender
            stu.hobbies = data.hobbies
            // for (const iterator in data) {
            //     console.log(iterator); //此处 data有许多隐藏属性
            // }
            // console.log (JSON.stringify(data))
            res.render('edit.html',stu);
        }
    })  
    
    
    // fs.readFile('db.json','utf8',function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error');
    //     }
    //     let students = JSON.parse(data).students;
    //     let stu = students.find(item=>item.sno == sno); //字符串和数字等
    //     res.render('edit.html',stu);
    // })
})


router.post('/studentEdit',(req,res)=>{
    let change = {
        name:req.body.name,
        age:parseInt(req.body.age),
        gender:parseInt(req.body.gender),
        hobbies:req.body.hobbies
    }
    Studb.update({sno:req.body.sno},change,function(err,data){
        if(err){
            res.status(500).send('Server error');
            console.log('更新失败')
        }else{
            console.log('更新成功')
            res.redirect('/')
        }
    })
    
    
    //文件操作
    // Students.edit(req.body,function(err){
    //     if(err){
    //         res.status(500).send('Server error');
    //     }
    //     res.redirect('/');
    // })
})
router.get('/studentDelete',(req,res)=>{
   let id = req.query.id;
   Studb.remove({_id:id},function(err,ret){
       if(err){
           res.status(500).send('Server error');
       }else{
           console.log('删除成功')
           res.redirect('/')
       }
   })
   console.log(id)
    // Students.delete(id,function(err){
    //     if(err){
    //         res.status(500).send('Server error ');
    //     }
    //     res.redirect('/');
    // })
})
// Router.get('/',(req,res)=>{
    
// })
// Router.get('/',(req,res)=>{
    
// })
// Router.get('/',(req,res)=>{
    
// })
module.exports = router;