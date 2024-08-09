const express = require('express');
const {login,registerAdmin,sendEmail, signUp,resetPassword, getUserByMail} = require('../controllers/authController')


//as User
const router = express.Router();
router.post('/login', login);
router.post('/signup', signUp);
router.get('/getbymail/:id', getUserByMail);
//as Admin
router.post('/register-admin', registerAdmin);

//send reset email

router.post('/send-email',sendEmail)

//Reset Password
router.post("/resetPassword", resetPassword);

module.exports = router;