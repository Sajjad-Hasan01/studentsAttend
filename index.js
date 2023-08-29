const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const StudentModel = require('./models/Students')
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// const connectionParams = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }
mongoose.connect(process.env.DB)

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) }
})

const upload = multer({storage: storage})

app.post('/signup', upload.single('profilePhoto'), async (req, res) => {
    const {name, email, password, group} = req.body, photo = req.file?.filename || null;
    const user = await StudentModel.findOne({email});
    
    if (user) return res.json({code: 11000, message:'email already exist'})
    const hashedPassword = bcrypt.hashSync(password,1)

    StudentModel.create({name, email, password: hashedPassword, group, photo})

    const getUser = await StudentModel.findOne({email})
    const userId = getUser.id;
    const token = jwt.sign({id: userId}, 'SAJJAD')

    return res.json({code: 0, message: 'Registration succeed', email, token, userId})
})

app.post('/login', async (req, res) => {
    const email= req.body.email;
    const password = req.body.password;
    const user = await StudentModel.findOne({email});
    
    if (!user) return res.json({code: 1, message:`email dosen't exist, check it again or sign up`})
    
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if (!isPasswordValid) return res.json({code: 2, message:'password is not correct'})

    const token = jwt.sign({id: user._id}, process.env.SECRET);
    return res.json({code: 0, message:'login succeed', email, token, userId:user._id})
})

app.post('/profile', async (req, res) => {
    const {profileOfUser} = req.body;
    const student = await StudentModel.findOne({ email: profileOfUser });
    if(student) return res.json(student)
})

app.post('/updateStudent', upload.single('profilePhoto'), async (req, res) => {
    const {name, email, group} = req.body, photo = req.file?.filename || null;

    if(req.file) await StudentModel.findOneAndUpdate({email}, {name, group, photo})
    else await StudentModel.findOneAndUpdate({email}, {name, group})

    return res.json({code: 0, message:'your update succeed'})
})

app.listen(3000, ()=>console.log("Server is live !"))