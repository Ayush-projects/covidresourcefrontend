const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
router.use(bodyParser.urlencoded({extended: false}));
const Volunteer = require('../db/model/volunteerSchema')
require('../db/conn.js');
router.use(express.json())

router.get('/', (req, res)=>{
    res.render('index');
})
router.post('/signup', async (req, res)=>{
    var {name, email, username, password, contact, address} = req.body;
    password = await bcrypt.hash(password,10);
    if(!name || !email || !username || !password || !contact || !address)
    {
        return res.status(422).json({message: 'Please Fill all the fields'});
    }
    var user = await Volunteer.findOne({username: username});
    if(user)
    {
                 return res.status(422).json({message: 'Username already taken'});
    }
    else
    {
        var temp = new Volunteer({name, email, username, password, contact, address, admin: 'false'});
        temp.save().then(()=>{
            res.status(201).json({message: 'User Successfully Registered, please login'});
        }).catch((error)=>{
            return res.status(500).json({message: 'Database Error, contact kryptonites.ju@gmail.com'})
        })
    }
    
   
    
})
router.post('/login', async (req,res)=>{
  var {username, password} = req.body;
  
  if(!username || !password)
    {
        return res.status(422).json({message: 'Please Fill all the fields'});
    }
   let user = await Volunteer.findOne({username: username})

   if(user)
   {
         
         let isMatch = await bcrypt.compare(password, user.password)
         if(!isMatch)
         {
                      res.status(400).json({message:'Invalid Username or Password'});
         }
         else
         { 
             res.status(201).json({message: 'Successfully Signed In'});

         }
   } 
   else
   {
       res.status(422).json({message: 'User is not registered'});
   }



  
})

module.exports = router;

