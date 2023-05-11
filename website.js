const express=require('express')
const app=express();
const path=require('path');
const fs=require('fs');
const nodemailer = require('nodemailer');


//for otp varification

//for checking date
// let date=new Date().toLocaleDateString()//convert into object to string
// let date=new Date()
// console.log(date);


// console.log(typeof(date));

global.global_name;
global.global_number;


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-come');
// require('./connection');  //error in connectioon file
const usermodel=require('./web_schema');
const accident_addres=require('./accident_schema');



// console.log(__dirname);
htmlfilepath=path.join(__dirname,'htmlpages1');
// console.log(htmlfilepath);

// this express.static(which file where css) is a middleware use for use css and image in ejs template
app.use(express.static(htmlfilepath));
// app.use(express.urlencoded());  //it will trow error
app.use(express.urlencoded({extended: true}));  //here dont require app.json

// app.use(express.json());

app.set('view engine','ejs');

app.get('',(req,resp)=>   // in '' in this is have defoult file which have index
{
    // resp.sendFile(`${htmlfilepath}/index.html`);
    // first it send index.html which in htmlfilepathe when we render ejs index also send index.html when we delete index.html than it render index.ejs 
    // index.html have more privoty than ejs 
    resp.render('index');
    // console.log(req.query);


});



app.get('/book.html',(req,resp)=>
{
    // resp.send(`<script>document.getElementById("name").innerHTML="${global.global_name}"</script>`)
    resp.sendFile(`${htmlfilepath}/book.html`);
    


});

app.get('/login.html',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/login.html`);


});
app.get('/contact.html',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/contact.html`);

});
app.get('/register.html',(req,resp)=>
{
    // resp.sendFile(`${htmlfilepath}/register.html`);
    resp.render('register');   //we can use ejs(view template)

});
// app.get('*',(req,resp)=>
// {
//     resp.sendFile(`${htmlfilepath}/nopage.html`);

// });

app.get('/details2.html',(req,resp)=>
{
    resp.render('details2');

});

// app.get('/details.html',async(req,resp)=>
// {
//     const result1 =await accident_addres.find();
    
//     resp.render('details1',{details:result1});

// });

// for report
app.post('/details2',async(req,resp)=>

{
    // console.log(req.body.from);
    // let b=new Date(req.body.from)
    // console.log(b);
    // const result1 =await accident_addres.find(
        
    //       {
    //         $and:[
    //             {"date":{$gte:req.body.from}},
    //             {"date":{$lte:req.body.to}}

    //         ]
    //       }
        
    // );

  
  
     const result1 =await accident_addres.find(

       { $and:[
          {
            "date":{$gte:new Date(req.body.from)}
          },
          {"date":{$lte:new Date(req.body.to)}}
       ]
       }
    );

    console.log(result1[0]);
    if(result1[0]!=undefined)
    {
    resp.render('details1',{details:result1});
    }
    else{
        resp.render('no_data_found');
    }

});



// for get all details
app.post('/alldata',async(req,resp)=>

{
     const result1 =await accident_addres.find();
    resp.render('details1',{details:result1});

});



app.get('*',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/nopage.html`);

});


app.post('/register',async(req,resp)=>
{
//    console.log(req.body);
try {
    const password=req.body.password;
    const cpassword=req.body.confirmpassword;

//checking password and confirmpassword should be same
if(password===cpassword){

    let data=new usermodel({
        name:req.body.name,
        email:req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
        confirmpassword:req.body.confirmpassword
       });
    
       let result=await data.save();
       console.log(result);

       //send mail

       

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'vickyjayswal12@gmail.com',
//         pass: '30858012'
//     }
// });

// // send mail with defined transport object
// let mailOptions = {
//     from: 'vickyjayswal12@gmail.com',
//     to: req.body.email,
//     subject: 'Registration Confirmation',
//     text: 'Thank you for registering!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });




       resp.sendFile(`${htmlfilepath}/login.html`);
    }

    else
    {
        // resp.send("password are not matching");
        resp.send(`<script>alert("password are not matching")</script>`);
        // resp.sendFile(`${htmlfilepath}/register.html`);  // not working


    }
    
} catch (error) {
    resp.status(400).send(error)
    
}
   
});


app.post('/login',async(req,resp)=>
{
    console.log(req.body.username);
    // let a=req.body.username;
    // console.log(typeof(a));
    const result =await usermodel.find(
        {username:req.body.username}
    );
    // console.log(result)
    // console.log(typeof(result));
    let pass=result[0].password
    global.global_name=result[0].name;
    global.global_number=result[0].mobile;


    if(pass===req.body.password)
    {
        
        // resp.sendFile(`${htmlfilepath}/book1.html`);
        resp.render('book1',{name:global.global_name});
        
    }
    else
    {
        resp.send("enter valid password or for login first to register ");
    }
    console.log(pass);
    // console.log(global_name);
    // console.log(global_number);



});






// store accident address(book withouth login)
app.post('/book',async(req,resp)=>
{
    // let date=new Date().toLocaleDateString()
    let data=new accident_addres({
        name:req.body.name,
        
        number: req.body.number,
       
        address:req.body.address,
        date:new Date()
       });
    
       let result=await data.save();
       console.log(result);
       resp.send(`<script>alert("your ambulance booking successfully")</script>`);
       
    }


);



// store accident address(book with login)
app.post('/book1',async(req,resp)=>
{
    //for cuurent date
    // let date=new Date().toLocaleDateString()

 console.log(global.global_name);
 console.log(global.global_number);
    let data=new accident_addres({
        name:global.global_name,
        
        number: global.global_number,
       
        address:req.body.address,
        date:new Date()

       });
    
       let result=await data.save();
      // console.log(result);
       resp.send(`<script>alert("your ambulance booking successfully")</script>`);
       
    }



);

app.listen(8000);