const express = require('express');
const mongoose = require('mongoose');
const port = 5000;
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
require('dotenv').config()
const app = express();
const router = express.Router();
const routerUser = require('./routes/api/user');
const routerBus = require('./routes/api/bus');
const routerBuy = require('./routes/api/buy');
const routerTravel = require('./routes/api/travel')
const routerTicket = require('./routes/api/ticket')
// connect to database
mongoose.connect(process.env.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(console.log('Database connected successfully'))
    .catch(err => console.log(err));
// initialize passport
app.use(passport.initialize())

require('./config/passport')(passport)

// middware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
app.use('/api/v1/users', routerUser);

app.use('/api/v1/buses', routerBus);
app.use('/api/v1/travels', routerTravel);
app.use('/api/v1/tickets', routerTicket);
app.use('/api/v1/buyies', routerBuy);

router.get('/test', (req, res) => {
    res.status(400).json({ msg: 'Testing BUS router' });
})
// listening to port
app.listen(process.env.PORT, (req, res) => console.log(`server running on server ${process.env.PORT}`))
