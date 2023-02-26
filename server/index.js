require('dotenv').config()
require('./config/db');
const app = require('express')()
const cors = require('cors')
const port = 5000;
const user = require('./model/model')
app.use(cors({origin: '*'}))
app.use(require('express').json())

app.get("/",async(req,res)=>{
  res.send(await user.find())
})
app.post('/signup',async (req,res)=>{
    const{email,password} = req.body
    try{
      const check = await user.find({username:email, password: password})
      if(check[0]){
        res.status(403).send({
          msg: "User Exist"
        })
      }
      else{
        await user.insertMany({username: email,password:password})
        res.status(201).send({
          msg: "User created"
        })
      }
    }catch(err){
      console.log(err)
    }
})
app.post('/login',async (req,res)=>{
    const{email,password} = req.body
    try{
      const check = await user.find({username:email, password: password})
      console.log(check)
      if(!check[0]){
        res.status(400).send({
          msg: "Not Found"
        })
      }
      else{
        res.status(200).send({
          msg: "Found"
        })
      }
    }catch(err){
      console.log(err)
    }
})

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
})

// app.listen(3000 , console.log("Hello World"))