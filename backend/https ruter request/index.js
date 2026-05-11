import express from "express";
const app = express();
const port = 3000;

app.get("/",(req,res) =>{
    res.send("<h1>Home page </h1> ");
    
})
app.get("/about",(req,res) =>{
    res.send("<h1>About me  </h1> <p> Hello there I am your boss </p>");
    
})
app.get("/contact",(req,res) =>{
    res.send("<h1> Contact me </h1> <p> phone : 01879902977 </P> ");
    
})

app.listen(port,() => {
    console.log(`Surver is running on port${port}.`);
})