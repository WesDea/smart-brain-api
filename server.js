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
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working')})

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {handleApiCall(req, res)})

let port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})