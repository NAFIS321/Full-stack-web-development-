//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
/*import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});*/


import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var Authorised = false;
app.use(bodyParser.urlencoded({ extended: true }));
 
function passowrdC (req,res,next){
  const password = req.body["password"];
  if (password === "ILoveProgmming"){
    Authorised = true;
  }else{  Authorised  = false; }
  next();

};
app.use(passowrdC);
app.get('/',(req,res)=>{
 res.sendFile(__dirname + "/public/index.html");
});
app.post('/check',(req,res)=>{
   if(Authorised){
    res.sendFile(__dirname + "/public/secret.html");
   }else{
    res.sendFile(__dirname + "/public/index.html");
   }

});

app.listen(port,()=>{
  console.log(`server is running on port${port}.`);

});