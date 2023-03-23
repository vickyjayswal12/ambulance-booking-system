const mongoose=require('mongoose');
const userchema = new mongoose.Schema({
    name: { type :String,         // schema have also type validation
    require:true
},
    email:{ type :String,         // schema have also type validation
    require:true
},
    mobile: { type :Number,         // schema have also type validation
    require:true
},
    username:{ type :String,         // schema have also type validation
    require:true,
    unique:true
},
    password: { type :String,         // schema have also type validation
    require:true
    
},
    confirmpassword:{ type :String,         // schema have also type validation
    require:true
}
});

//export model of db
module.exports=mongoose.model('user',userchema);    //('table of dn',schema name)