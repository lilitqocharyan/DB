const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../Controllers/users')
const { Pool, Client } = require('pg')

router.use(bodyParser.json());

const connectionString = 'postgres://wzaeuptvtwgtqv:ea71caae1c82b7963bfbc759329a70b8bb72d6224ae615a5040600994ce6b2b5@ec2-54-247-169-129.eu-west-1.compute.amazonaws.com:5432/d9pfpj93lscl47'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const pool = new Pool({
    connectionString,
     ssl:true
  })

//Validation User
function validUser(user) {
    const validEmail = typeof user.email == 'string' && 
    user.email.trim() != ''
    const validPassword = typeof user.password == 'string' && 
    user.password.trim() != '' &&
    user.password.trim().lenght >= 6

    return validEmail && validPassword
}
//signup
router.post('/signup',async(req,res) => {
    if(!validUser) {
        res.send(400).send("incorrect email or password")
    } else {
        const email = req.body.email
        //hashing password
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        pool.query('INSERT INTO lilit.Users VALUES(default,$1,$2)', [email,hashPassword])
        .then(data => {
            res.send('inserted')
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(()=>{
            done()
        })
    }
})

router.post('/login', async(req,res) => {
    if(!validUser) {
        res.send(400).send("incorrect email or password")
    } else {
        
        const existEmail = pool.query("select 'true'  WHERE  EXISTS (select * from lilit.users where email = '$1')",[req.body.email])
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    }
})

    module.exports = router;