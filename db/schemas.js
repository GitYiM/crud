//学生格式
exports.stuSchema = {
    sno:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:Number,
        enum:[0,1],
        required:true
    },
    hobbies:{
        type:String
        // required:true
    }
}