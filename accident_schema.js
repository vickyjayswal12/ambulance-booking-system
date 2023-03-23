const mongoose=require('mongoose');
const accident_schema = new mongoose.Schema({
    name: { type :String,         // schema have also type validation
    require:true
},
 
    number: { type :Number,         // schema have also type validation
    require:true
},
    
    address:{ type :String,         // schema have also type validation
    require:true
},
date: { type :Date,         // schema have also type validation
require:true
}
});

//export model of db
module.exports=mongoose.model('accident_addres',accident_schema);