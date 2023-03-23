const express=require('express')
const app=express();
const path=require('path');
//console.log(__dirname);
htmlfilepath=path.join(__dirname,'htmlPages');
//console.log(htmlpath);
app.get('',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/website.html`);


});
app.get('/aboutus.html',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/aboutus.html`);


});

app.get('/login.html',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/login.html`);


});
app.get('/contact_us.html',(req,resp)=>
{
    resp.sendFile(`${htmlfilepath}/contact_us.html`);

});


app.listen(8000);