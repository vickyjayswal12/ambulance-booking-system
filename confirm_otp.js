const {sendConfirmationEmail,sendConfirmation}=require('./mailtesting');
const generate_otp=require('./generate_otp')
const express=require('express');
const app=express();
// app.use(express.static(htmlfilepath));
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

global.otpCode=generate_otp();
global.mail;
// const mail='vickyjayswal12@gmail.com';
// sendConfirmationEmail(mail,otpCode);
app.get("/",(req,resp)=>
{
    resp.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="/varify_otp" >
            <center><h1>Enter mail</h1></center>
            <input type="email" name="email" id="email">
    
            <input type="submit" value="submit" formmethod="post">
        </form>
    </body>
    </html>`);
})
app.post("/varify_otp",(req,resp)=>
{
    mail=req.body.email;
    sendConfirmationEmail(mail,otpCode);

    resp.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="/varify_otp1" >
            <center><h1>Enter otp from mail</h1></center>
            <input type="number" name="otp" id="otp">
    
            <input type="submit" value="varify otp" formmethod="post">
        </form>
    </body>
    </html>`)
})


app.post("/varify_otp1",(req,resp)=>{
if(req.body.otp===otpCode)
{
    sendConfirmation(mail);
    resp.send(`<script>alert("registration is successfull")</script>`);
}
else{
    resp.send(`<script>alert("password are not matching")</script>`);
}
})

app.listen(8000);
