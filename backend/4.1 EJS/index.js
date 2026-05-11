import express from "express";
const app = express();
const port  = 3000;


app.get("/",(req,res)=>{
    const today = new Date();
let day = today.getDay();

let type="The weekend";
let adv ="It is tiem to play My boy";

if (day===0||day===6){
    typeype="The weekday";
       adv="It is tiem to do some programming";
}

    res.render("index.ejs",{
       dayType:type,
       advice:adv,
    })
})
app.listen(port,(req,res)=>{
    console.log(`server is running in port ${port}.`);
});