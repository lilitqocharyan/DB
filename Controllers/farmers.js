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


//get by id from farmers
router.get('/get/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.Farmers Where FarmerId = $1', [req.params.id])
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

//get all Farmers
router.get('/getAll', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('Select * FROM lilit.Farmers')
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
  //insert Farmer
  router.post('/insert', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('INSERT INTO lilit.Farmers VALUES(default,$1,$2,$3,$4,$5)', [req.body.firstName,req.body.lastName,req.body.region,req.body.city,req.body.address])
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

//delete Farmer by id
router.delete('/delete/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('delete from lilit.Farmers where FarmerId = $1', [req.params.id])
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

//update Farmer by id
router.put('/update/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err){
            res.send(err)
        }
        client.query('update lilit.Farmers set FirstName = $1, LastName = $2,Region = $3, City = $4,Address = $5 where FarmerId = $6', [req.body.firstName,req.body.lastName,req.body.region,req.body.city,req.body.address,req.params.id])
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