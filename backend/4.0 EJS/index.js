import express from "express";
const app = express();
const port = 3000;


app.get('/',(req,res)=>{

    const today = new Date("July 23, 1983 01:15:00");
    const day = today.getDay();

  //console.log(day);
  let type = "weekday";
  let adv = "It's time to work";

  if(day == 0 || day == 6){
     type = "weekend";
     adv = "It's time to have fun";
  }

    res.render("index.ejs",{
        dayType :type,
        advice : adv,
        });
});

app.listen(3000,()=>{
    console.log(`server is running on port${port}.`);
});