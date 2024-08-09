require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const roleRoute = require('./routes/roleRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const assignRoute = require('./routes/assignRoute');
const signRoute = require('./routes/signRoute');
const profileRoute = require('./routes/profileRoute');
const assessmentRoute = require('./routes/assessmentRoute');
const verbalRoute = require('./routes/verbalRoute');
const digitalRoute = require('./routes/digitalRoute');
const clientServiceAgreementRoutes = require('./routes/clientServiceAgreementRoute');
const cna1Routes = require('./routes/cna1Routes');
const vitalSignsRoutes = require('./routes/vitalSignsRoutes');
const serviceplan1Routes = require('./routes/serviceplan1');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    Credentials: true
};

var app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/assign', assignRoute);
app.use('/api/sign', signRoute);
app.use('/api/profile', profileRoute);
app.use('/api/assessment', assessmentRoute);
app.use('/api/verbal', verbalRoute);
app.use('/api/digital', digitalRoute);
app.use('/api/client', clientServiceAgreementRoutes);
app.use('/api', cna1Routes);
app.use('/api', vitalSignsRoutes);
app.use('/api', serviceplan1Routes);


// Response handler Middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });
