const router = require('express').Router();
const verify = require('../Router/verifyToken');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg')

router.use(bodyParser.json());

//require('dotenv').config()

//connect DB
//let connectionString = process.env.postgresconnect
const connectionString = 'postgres://wzaeuptvtwgtqv:ea71caae1c82b7963bfbc759329a70b8bb72d6224ae615a5040600994ce6b2b5@ec2-54-247-169-129.eu-west-1.compute.amazonaws.com:5432/d9pfpj93lscl47'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const pool = new Pool({
    connectionString,
     ssl:true
  })

//get by id from users
router.get('/get/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.Users Where UserId = $1', [req.params.id])
        .then(result => {
            return result.rows
        })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})

//get all users
router.get('/getAll', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.Users')
        .then(result => {
            return result.rows
        })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})
  //insert user
  router.post('/insert', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('INSERT INTO lilit.Users VALUES(default,$1,$2)', [req.body.email,req.body.password])
        .then(data => {
            res.send('inserted')
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})

//delete user by id
router.delete('/delete/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('delete from lilit.Users where UserId = $1', [req.params.id])
        .then(data => {
            res.send('deleted')
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})

//update user by id
router.put('/update/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('update lilit.Users set Email = $1, Password = $2, where UserId = $3', [req.body.email,req.body.password,req.params.id])
        .then(data => {
            res.send('updateed')
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    })
})



module.exports = router;