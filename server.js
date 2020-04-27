const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const database = 0;
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'celebrityrecognition'
    }
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send(db.users);})

//signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//profile id
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

//update entries
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

//image api
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3000, () => {
    console.log('app is running on 3000')
})

