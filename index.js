const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./db');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
const { upload } = require('./middleware/uploadPhoto');
const { attendCalc } = require('./middleware/attendCalc');
const { profileRoute } = require('./routes/profile');
const { signupRoute } = require('./routes/signup');
const { loginRoute } = require('./routes/login');
const { logoutRoute } = require('./routes/logout');
const { attendanceRoute } = require('./routes/attendance');
const { studentsRoute } = require('./routes/students');
const { updateStudentRoute } = require('./routes/updateStudent');
const { deleteUserRoute } = require('./routes/deleteUser');
const { clearCollectionRoute } = require('./routes/clearCollection');
require("dotenv").config();

const domain = process.env.DOMAIN;
const corsOptions = {
    origin: domain,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

const app = express();
app.use(cors(corsOptions));
//app.options('*', cors(corsOptions)); // I thought this line not important
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET));

dbConnection();


app.post('/signup', upload.single('profilePhoto'), async (req, res) => signupRoute(req, res));
app.post('/login', async (req, res) => loginRoute(req, res));
app.get('/logout', async (req, res) => cookieJwtAuth(req, res, logoutRoute));
app.get('/profile', async (req, res) => cookieJwtAuth(req, res, profileRoute));
app.get('/students', async (req, res) => cookieJwtAuth(req, res, studentsRoute));
app.post('/attendance', async (req, res) => cookieJwtAuth(req, res, attendanceRoute));
app.post('/updateStudent', upload.single('profilePhoto'), async (req, res) => cookieJwtAuth(req, res, updateStudentRoute));
app.delete('/deleteUser', async (req, res) => cookieJwtAuth(req, res, deleteUserRoute));
app.delete('/clearCollection', async (req, res) => cookieJwtAuth(req, res, clearCollectionRoute));
// app.post('/checkStudentsStatus', async (req, res) => cookieJwtAuth(req, res, attendCalc));

app.listen(process.env.PORT, ()=>console.log("Server is live ! V.3"));

/*
200 OK
201 Created
202 Accepted
203 Non-Authoritative Information
204 No Content
205 Reset Content

400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed

500 Internal Server Error
501 Not Implemented

*/