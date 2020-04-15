const express = require('express');
const app = express();

//Import Route
const authRoute = require('./Router/auth')
const userRoute = require('./Controllers/users')
const farmerRoute = require('./Controllers/farmers')
const slaughterhouseRoute = require('./Controllers/slaughterhouses')


//use
app.use('/api', authRoute);
app.use('/api/user' , userRoute);
app.use('/api/farmer' , farmerRoute);
app.use('/slaughterhouse', slaughterhouseRoute)
//port
app.listen(3000, () => {
    console.log('Server running');
});