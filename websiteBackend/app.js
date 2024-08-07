require('dotenv').config()
const express = require('express') 
const mongoose = require('mongoose')
// const companyLoginRoutes = require('./routes/companyLoginRoutes')
const roleRoute = require('./routes/roleRoute')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const vehicleRoute = require('./routes/vehicleRoute')
const testRoute = require('./routes/testRoute')
const cartRoute = require('./routes/productRoute')
const payment=require('./routes/paymentRout')
const transfer=require('./routes/transferRoute')
const Booking=require('./routes/BookingRoute')
const Ordering=require('./routes/OrderingRoute')


const bodyParser = require('body-parser')
// const itemInventoryRoute = require('./routes/itemInventoryRoute')
// const errorMiddleware = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
const cookieParser = require('cookie-parser')

var cors = require('cors')
var app = express();
var corsOptions = {
    origin: "*",
    methods:"GET,POST, PUT, DELETE",
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    Credentials: true
}
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use('/api/login', companyLoginRoutes)
//to create roles
app.use('/role', roleRoute)
//to register and login
app.use('/auth', authRoute)
//to list users
app.use('/user', userRoute)

app.use('/vehicle', vehicleRoute)
app.use('/test', testRoute)
app.use('/cart',cartRoute )
app.use('/payment',payment )
app.use('/transfer',transfer)
app.use('/Booking',Booking)
app.use('/Ordering',Ordering)

//Response handler Middleware

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 5000;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
})
// app.use(errorMiddleware);

//database connect

mongoose.set("strictQuery", false)
mongoose.
    connect(MONGO_URL,)
    .then(() => {
        //console.log('connected to MongoDB')
        app.listen(PORT, () => {
            //console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) => {
        //console.log(error)
    })
