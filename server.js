import express from 'express';
import bcrypt from 'bcrypt-node';
import cors from 'cors';
import knex from 'knex';


import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import { handleApiCall, handleImage } from './controllers/image.js';
import handleProfile from './controllers/profile.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'smart-brain'
    }
  });



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log("listening on port 3000");
})