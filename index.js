const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/Users.model');
const StudentModel = require('./models/Students.model');
const LectureModel = require('./models/Lectures.model');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
require("dotenv").config();

const app = express();
const domain = process.env.DOMAIN;
const corsOptions = {
    origin: domain,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

mongoose.connect(process.env.DB);

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) }
});

const upload = multer({storage: storage});

app.post('/signup', upload.single('profilePhoto'), async (requist, response) => {
    const {name, email, password, group} = requist.body, photo = requist.file?.filename || null;
    
    UserModel.findOne({email}).then(user =>{
        if (user) return response.json({code: 11000, message:'email already exist'});

        const hashedPassword = bcrypt.hashSync(password,1);

        UserModel.create({name, email, password: hashedPassword, photo})
        .then(({id}) => {
            const token = jwt.sign({id}, process.env.SECRET);

            StudentModel.create({user: id, group})
            .then(() => response.json({code: 0, message: 'Registration succeed', email, token, userId: id}))
            .catch(e => response.json(e.message));
        })
        .catch(e => response.json(e.message));
    }).catch(e => response.json(e.message));
});

app.post('/attendance', async (req, response) => {
    const attendanceList = req.body;
    attendanceList.forEach(({id, attendance}) => {
        StudentModel.findById(id)
        .then(student => {
            LectureModel.create({student: student.id, attendance})
            .then(async lecture => {
                student.lectures.push(lecture); 
                await student.save();
            });
        });
    });
    return response.json({code: 0, message: "Done"});
});

app.post('/login', async (req, response) => {
    const {email, password} = req.body;

    UserModel.findOne({ email })
    .then(user => {
        bcrypt.compare(password , user.password)
        .then(isPasswordValid => {
            if (isPasswordValid) {
                delete user.password;
                const token = jwt.sign(user.toObject() , process.env.SECRET, { expiresIn: '30d' });
                
                response.cookie("token", token, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    signed:false,
                }).json({ success: true, message: 'login succeed' });

                // response.redirect("/");
            } else response.json({ success: false, message: 'password is not correct' })
        }).catch(e => response.json({message: e.message}));
    }).catch(() => response.json({success: false, message: `email dosen't exist, check it again or sign up`}));
});

// app.post('/login', loginRoute);
// app.post('/add', cookieJwtAuth, addRoute);

app.get('/students', async (req, res) => {
    // const options = {
    //     // sort returned documents in ascending order by title (A->Z)
    //     sort: { title: 1 },
    //     // Include only the `title` and `imdb` fields in each returned document
    //     projection: { _id: 1, user: 1, group: 1, status:1, lectures:1 },
    // };
    const students = await StudentModel.find().populate('user').populate('lectures');
    if(students) return res.json(students);
})

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers['set-cookie'];

    if (!cookieHeader) return list;
    const cookies = cookieHeader[0];

    cookies.split(`,`).forEach(cookie => {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

app.post('/profile', async (req, res) => {
    // cookieJwtAuth()
    // const token = parseCookies(req)?.token;
    const token = await req.cookies?.token;
    
    if (token) {
        const user = jwt.verify(token, process.env.SECRET);
        StudentModel.findOne({ user: user._id }).populate('user').populate('lectures')
        .then(student => res.json(student))
        .catch(error => res.json(error))
    }
})

app.post('/clear', async (req, res) => {
    const collection = req.body.collection;
    if (collection === "users") {        
        UserModel.deleteMany({})
        .then(r => res.send('done!'));
    } else if (collection === "students") {        
        StudentModel.deleteMany({})
        .then(r => res.send('done!'));
    } else if (collection === "lectures") {        
        LectureModel.deleteMany({})
        .then(r => res.send('done!'));
    }
})

app.post('/updateStudent', upload.single('profilePhoto'), async (req, res) => {
    const {id, name, group} = req.body, photo = req.file?.filename || null;

    if (req.file) {
        UserModel.findOneAndUpdate({ _id : id }, { name, photo })
        .then(() => {
            StudentModel.findOneAndUpdate({user: id}, {group})
            .then(() => res.json({code: 0, message:'your update succeed'}))
            .catch(error => res.json({code: 1, message: "student not found", error}))
        }).catch(error => res.json({code: 1, message: "user not found", error}));
    } else {
        UserModel.findOneAndUpdate({ _id : id }, { name })
        .then(() => {
            StudentModel.findOneAndUpdate({user: id}, { group })
            .then(() => res.json({code: 0, message:'your update succeed'}))
            .catch(error => res.json({code: 1, message: "student not found", error}))
        }).catch(error => res.json({code: 1, message: "user not found", error}));
    }
})


//set a simple for homepage route
// app.get('/', (req, res) => {
//     res.send('welcome to a simple HTTP cookie server');
// });

app.listen(3000, ()=>console.log("Server is live !"));