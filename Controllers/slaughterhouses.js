const router = require('express').Router();
const verify = require('../Router/verifyToken');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg')

router.use(bodyParser.json());

//connect DB
const connectionString = 'postgres://wzaeuptvtwgtqv:ea71caae1c82b7963bfbc759329a70b8bb72d6224ae615a5040600994ce6b2b5@ec2-54-247-169-129.eu-west-1.compute.amazonaws.com:5432/d9pfpj93lscl47'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const pool = new Pool({
    connectionString,
     ssl:true
  })


//get by id from slaughterhouse
router.get('/get/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.slaughterhouse Where slaughterhouseId = $1', [req.params.id])
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

//get all slaughterhouses
router.get('/getAll', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.slaughterhouse')
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
  //insert slaughterhouse
  router.post('/insert', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('INSERT INTO lilit.slaughterhouse VALUES(default,$1,$2,$3,$4)', [req.body.name,req.body.region,req.body.city,req.body.address])
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

//delete slaughterhouse by id
router.delete('/delete/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('delete from lilit.slaughterhouse where slaughterhouseId = $1', [req.params.id])
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

//update slaughterhouse by id
router.put('/update/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('update lilit.slaughterhouse set Name = $1,Region = $2, City = $3,Address = $4 where slaughterhouseId = $5', [req.body.name,req.body.region,req.body.city,req.body.address,req.params.id])
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