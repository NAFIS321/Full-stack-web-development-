import express from "express";
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
   res.send("<h1>Hello Welcome To My Page!</h1>");
});
app.get('/contact',(req,res)=>{
    res.send(`
        <h1> Contact Me </h1> 
         <p> My number: 01879902977</p>
         `);
});
app.get('/about',(req,res)=>{
    res.send(`<h1>About </h1> 
         <p> I am a full stack Web developer That's it </p>`);
});

app.listen(port,()=>{
console.log(`server is running in  port ${port}.`)
})