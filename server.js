const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const image=require('./controllers/image');
const profile=require('./controllers/profile');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
//---------------------------end of imports
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'mhd.sad22',
    password : '',
    database : 'smart-brain'
  }
 });
const app=express();
app.use(express.json());
app.use(cors());
//--------------------routes : 
app.get('/',(req,res)=>db('users').select('*').orderBy('id').then(data=>res.json(data)));
app.post('/signin',signin.handleSignin(bcrypt,db));
app.post('/register',register.handleRegister(db,bcrypt));
app.get('/profile/:id',profile.handleProfile(db));
app.put('/image',image.handleImage(db));
app.post('/image',image.handleApiKey);
//----------------------routes end
app.listen(3000 , ()=>console.log("app is running on 3000 .."));

