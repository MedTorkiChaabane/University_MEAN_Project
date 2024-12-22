//import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
//importer mongoose module
const mongoose = require('mongoose');
//import bcrypt module
const bcrypt = require("bcrypt");
//importer path
const path = require('path');
//importer multer
const multer = require('multer');
//importer jsonwebtoken
const jwt = require("jsonwebtoken");
//configuration Twilio
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_STRING;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
//importer nodemailer
const nodemailer = require('nodemailer');

//Connect APP with DB server (changeable a chaque projet)
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//create express application
const app = express();

// Configure Body-parser
// Send JSON responses
app.use(bodyParser.json());
// Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// Upload Files Configuration
//Création des raccourci
app.use('/images', express.static(path.join('backend/images')));
app.use('/cvs', express.static(path.join('backend/cvs')));
//Type des médias valid
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
}
//Configuration Multer
const storageConfig = multer.diskStorage({
    // destination

    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");

        if (isValid) {
            error = null;
        }
        if (file.mimetype === 'application/pdf') {
            cb(null, 'backend/cvs');
        } else {
            cb(null, 'backend/images');
        }

    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];

        if (file.mimetype === 'application/pdf') {
            const cvName = name + '-' + Date.now() + '-croco-' + '.' + extension;
            cb(null, cvName);
        } else {
            const imgName = name + '-' + Date.now() + '-croco-' + '.' + extension;
            cb(null, imgName);

        }

    }
});

//import Models
const User = require("./models/user");
const Note = require("./models/note");
const Opinion = require("./models/opinion");
const Course = require("./models/course");
const Question = require("./models/question");
const Result = require("./models/result");

//Business Logic
//1- Business Logic: signupStudent
app.post("/users/signupStudent",
    multer({ storage: storageConfig }).single('img'),
    (req, res) => {
        //req.protocol=> http req.get('host')=> localhost:3000
        let url = req.protocol + '://' + req.get('host');
        console.log("Here into BL: signup", req.body);
        bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
            let imgPath;
            imgPath = req.file ? url + "/images/" + req.file.filename : url + "/images/avatar.jpg";
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPwd,
                tel: req.body.tel,
                address: req.body.address,
                role: req.body.role,
                level: req.body.level,
                status: req.body.status,
                img: imgPath,
            });
            user.save((err, doc) => {

                console.log("here doc", doc);
                if (err) {
                    // console.log("Here error email", err.errors.email);
                    // console.log("Here error tel", err.errors.tel);
                    if (err.errors.email) {
                        res.json({ message: "0" });
                    } else {
                        res.json({ message: "1" });
                    }
                } else {
                    res.json({ message: "2" });
                }
            });


        });
    });
//2- Business Logic: signupStudent
app.post("/users/signupTeacher",
    multer({ storage: storageConfig }).single('cv'),
    (req, res) => {
        //req.protocol=> http req.get('host')=> localhost:3000
        let url = req.protocol + '://' + req.get('host');
        console.log("Here into BL: signup", req.body);
        bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
            let cvPath;
            cvPath = url + "/cvs/" + req.file.filename;
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPwd,
                tel: req.body.tel,
                address: req.body.address,
                role: req.body.role,
                speciality: req.body.speciality,
                cv: cvPath,
            });
            user.save((err, doc) => {
                console.log("here doc", doc);
                if (err) {
                    // console.log("Here error email", err.errors.email);
                    // console.log("Here error tel", err.errors.tel);
                    if (err.errors.email) {
                        res.json({ message: "0" });
                    } else {
                        res.json({ message: "1" });
                    }
                } else {
                    res.json({ message: "2" });
                }
            });


        });
    });
//3- Business Logic: SignupAdmin
app.post("/users/signupAdmin", (req, res) => {
    console.log("Here into BL: signup", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: cryptedPwd,
            tel: req.body.tel,
            address: req.body.address,
            role: req.body.role,

        });
        user.save((err, doc) => {
            console.log("here doc", doc);
            if (err) {
                // console.log("Here error email", err.errors.email);
                // console.log("Here error tel", err.errors.tel);
                if (err.errors.email) {
                    res.json({ message: "0" });
                } else {
                    res.json({ message: "1" });
                }
            } else {
                res.json({ message: "2" });
            }
        });


    });

});
//4- Business Logic: SignupParent
app.post("/users/signupParent", (req, res) => {
    console.log("Here into BL: signup", req.body);
    User.findOne({ tel: req.body.telChild, role: "Student" }).then((doc) => {
        console.log("here Doc SignupParent", doc);
        if (doc) {
            bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
                let user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: cryptedPwd,
                    tel: req.body.tel,
                    telChild: req.body.telChild,
                    address: req.body.address,
                    role: req.body.role,
                });
                user.save((err, doc) => {
                    console.log("here doc", doc);
                    if (err) {
                        // console.log("Here error email", err.errors.email);
                        // console.log("Here error tel", err.errors.tel);
                        if (err.errors.email) {
                            res.json({ message: "0" });
                        } else {
                            res.json({ message: "1" });
                        }
                    } else {
                        res.json({ message: "2" });
                    }
                });
            });
        } else {
            res.json({ message: "1" });
        }
    });
});
//5- Business Logic: getAllStudents
app.get("/users/getAllStudents", (req, res) => {
    User.find({ role: "Student" }).then((docs) => {
        res.json({ studentsArray: docs });
    });
});
//6- Business Logic: getAllTeachers
app.get("/users/getAllTeachers", (req, res) => {
    User.find({ role: "Teacher" }).then((docs) => {
        res.json({ teachersArray: docs });
    });
});
//7- Business Logic: getAllParents
app.get("/users/getAllParents", (req, res) => {
    User.find({ role: "Parent" }).then((docs) => {
        res.json({ parentsArray: docs });
    });
});
//8- Business Logic: deleteUserById
app.delete("/users/deleteUser/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((response) => {
        // here response { n: 1, ok: 1, deletedCount: 1 }
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});
//9- Business Logic: getUserById
app.get("/users/getUser/:id", (req, res) => {
    //traitement logic
    let id = req.params.id;
    User.findOne({ _id: id }).then((doc) => {
        res.json({ user: doc });
    });
});
//10- Business Logic: updateUser (affectStudentToTeacher)
app.put("/users/updateUser", (req, res) => {
    //traitement logic
    let newUser = req.body;
    console.log(req.body);
    User.updateOne({ _id: newUser._id }, newUser).then(
        (response) => {
            if (response.nModified == 1) {
                res.json({ isUpdated: true });
            } else {
                res.json({ isUpdated: false });
            }
        }
    );

});

//11- Business Logic: login
app.post("/users/login", (req, res) => {
    let userToSend;
    User.findOne({ $or: [{ email: req.body.email }, { tel: req.body.tel }] }).then((response) => {
        console.log("Here doc", response);
        if (!response) {
            res.json({ message: "0" });
        } else {
            userToSend = response;
            bcrypt.compare(req.body.password, response.password).then((pwdResponse) => {
                console.log("Here pwdResponse", pwdResponse);
                if (!pwdResponse) {
                    res.json({ message: "1" });
                } else {
                    // Obeject UserObj{fName, lName, id, role}
                    let userObj = {
                        id: userToSend._id,
                        fName: userToSend.firstName,
                        lName: userToSend.lastName,
                        role: userToSend.role,
                    };
                    res.json({ message: "2", user: userObj });
                }
            });
        }
    });
});

/*******************JWT*************/
//11'- Business Logic: login
app.post("/users/loginJwt", (req, res) => {
    let userToSend;
    User.findOne({ $or: [{ email: req.body.email }, { tel: req.body.tel }] }).then((response) => {
        console.log("Here doc", response);
        if (!response) {
            res.json({ message: "0" });
        } else {
            userToSend = response;
            bcrypt.compare(req.body.password, response.password).then((pwdResponse) => {
                console.log("Here pwdResponse", pwdResponse);
                if (!pwdResponse) {
                    res.json({ message: "1" });
                } else {
                    const token = jwt.sign(
                        {
                            email: userToSend.email,
                            userId: userToSend._id,
                            userRole: userToSend.role,
                        },
                        "Testing",
                        { expiresIn: "1min" }
                    );

                    // Obeject UserObj{fName, lName, id, role}
                    let userObj = {
                        id: userToSend._id,
                        fName: userToSend.firstName,
                        lName: userToSend.lastName,
                        role: userToSend.role,
                        jwt: token,
                        expiresIn: 60,
                    };
                    res.json({ message: "2", user: userObj });
                }
            });
        }
    });
});
/************************************/

//12- Business Logic: getAllUsersSortByRole (Admin)
app.get("/users/sortByRole", (req, res) => {
    User.find().then((docs) => {
        const roleOrder = {
            Teacher: 1,
            Parent: 2,
            Student: 3,
            admin: 4,
        };
        docs.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
        response = docs.filter((obj) => { return (obj.role == "Teacher" || obj.role == "Parent" || obj.role == "Student") });
        res.json({ allUsersArray: response });
    });
});

//13- Business Logic: getAllMyStudents (Teacher)
app.get("/users/getMyStudents/:id", (req, res) => {
    User.find({ idTeacher: req.params.id }).then((docs) => {
        res.json({ allMyStudentsArray: docs });
    });
});

//14- Business Logic: giveNote (Teacher)
app.post("/notes/addNote", (req, res) => {
    let note = new Note(req.body);
    note.save((err, doc) => {
        console.log("here added Doc", doc);
        if (err) {
            res.json({ isAdded: false });
        } else {
            res.json({ isAdded: true });
        }
    });
});

//15- Business Logic: giveOpinion (Teacher)
app.post("/opinions/addOpinion", (req, res) => {
    let opinion = new Opinion(req.body);
    opinion.save((err, doc) => {
        console.log("here added Doc", doc);
        if (err) {
            res.json({ isAdded: false });
        } else {
            res.json({ isAdded: true });
        }
    });
});

//16- Business Logic: addCourse (Teacher)
app.post("/courses/addCourse",
    multer({ storage: storageConfig }).single('img'),
    (req, res) => {
        //req.protocol=> http req.get('host')=> localhost:3000
        let url = req.protocol + '://' + req.get('host');
        console.log("Here into BL: addCourse", req.body);
        let imgPath;
        imgPath = url + "/images/" + req.file.filename;
        let course = new Course({
            name: req.body.name,
            description: req.body.description,
            modules: req.body.modules,
            price: req.body.price,
            idTeacher: req.body.idTeacher,
            img: imgPath,
        });
        course.save((err, doc) => {
            console.log("Here error", err);
            console.log("here doc", doc);
            if (err) {
                res.json({ isAdded: false });
            } else {
                res.json({ isAdded: true });
            }
        });

    });

//17- Business Logic: getMyCourses (Teacher)
app.get("/courses/getMyCourses/:id", (req, res) => {
    Course.find({ idTeacher: req.params.id }).then((docs) => {
        res.json({ myCoursesArray: docs });
    });
});
//18- Business Logic: getCourseById (displayCourse) (Teacher)
app.get("/courses/getCourseById/:id", (req, res) => {
    Course.findOne({ _id: req.params.id }).then((doc) => {
        res.json({ course: doc });
    });
});
//19- Business Logic: editCourseById (Teacher)
app.put("/courses/editCourse", (req, res) => {
    let newCourse = req.body;
    Course.updateOne({ _id: newCourse._id }, newCourse).then((response) => {
        if (response.nModified == 1) {
            res.json({ isUpdated: true })
        } else {
            res.json({ isUpdated: false });
        }

    });
});
//20- Business Logic: deleteCourseById  (Teacher)
app.delete("/courses/deleteCourse/:id", (req, res) => {
    Course.deleteOne({ _id: req.params.id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});
//21- Business Logic: getMyNotes (Student)
app.get("/notes/getMyNotes/:idStudent", (req, res) => {
    console.log(req.params.idStudent);
    Note.find({ idStudent: req.params.idStudent }).then((docs) => {
        if (docs) {
            res.json({ MyNotesArray: docs });
        } else {
            res.json({ message: "you don't have note ,yet" })
        }
    });
});
//22- Business Logic: getUserByTel (Parent)
app.get("/users/getUserByTel/:tel", (req, res) => {
    User.findOne({ tel: req.params.tel }).then((doc) => {
        res.json({ user: doc });
    });
});
//23- Business Logic: getMyOpinions (Student)
app.get("/opinions/getMyOpinions/:idStudent", (req, res) => {
    Opinion.find({ idStudent: req.params.idStudent }).then((docs) => {
        if (docs) {
            res.json({ MyOpinionsArray: docs });
        } else {
            res.json({ message: "you don't have Opinion ,yet" })
        }
    });
});
//24- Business Logic: getStudentCourses (Student)
app.post("/courses/studentCourses", (req, res) => {
    Course.find({ _id: { $in: req.body.courseTab } }).then((docs) => {
        if (docs) {
            res.json({ studentCoursesArray: docs });
        } else {
            res.json({ message: "you don't have any courses ,yet" })
        }
    });
});
//25- Business Logic: getAllCourses (Courses Component)
app.get("/courses/getAll", (req, res) => {
    Course.find().then((docs) => {
        if (docs) {
            res.json({ coursesArray: docs });
        } else {
            res.json({ message: "there isn't any course" });
        }
    });
});
//26- Business Logic: ChangeUserPassowrd (Student/Teacher/Parent)
app.put("/users/changeUserPassword", (req, res) => {
    console.log("here sened from F.E obj in B.E", req.body);
    User.findOne({ _id: req.body._id }).then((doc) => {
        console.log("here data in DB", doc);
        bcrypt.compare(req.body.oldPassword, doc.password).then((pwdResponse) => {
            if (!pwdResponse) {
                res.json({ message: "Check your old password!" });
            } else {
                bcrypt.hash(req.body.newPassword, 8).then((cryptedPassword) => {
                    User.updateOne({ _id: req.body._id }, { password: cryptedPassword }).then((response) => {
                        if (response.nModified == 1) {
                            res.json({ message: "Password changed" });
                        }
                        else {
                            res.json({ message: "Error" });
                        }
                    });
                });
            }
        });
    });
});
//27- Business Logic: add a Question (Teacher)
app.post("/questions/addQuestion", (req, res) => {
    console.log("here into BL: add Question", req.body);
    let question = new Question(req.body);
    question.save((err, doc) => {
        console.log("Here error", err);
        console.log("here doc", doc);
        if (err) {
            res.json({ isAdded: false });
        } else {
            res.json({ isAdded: true });
        }
    });
});
//28- Business Logic: get teacher questions (Teacher)
app.get("/questions/getTeacherQuestions/:idTeacher", (req, res) => {
    Question.find({ idTeacher: req.params.idTeacher }).then((docs) => {
        res.json({ myQuestionsArray: docs });
    });
});
//29- Business Logic: delete a question (Teacher)
app.delete("/questions/deleteQuestion/:id", (req, res) => {
    Question.deleteOne({ _id: req.params.id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});
//230- Business Logic: searchCourseByName (Student) 
app.post("/courses/searchCourse", (req, res) => {
    Course.find({ name: { $regex: req.body.name, $options: 'i' } }).then((docs) => {
        res.json({ searchCoursesArray: docs });
    });
});
//29- Business Logic: searchUserByName (Admin)
app.post("/users/searchUsers", (req, res) => {
    User.find({ firstName: { $regex: req.body.name, $options: 'i' }, $or: [{ role: 'Teacher' }, { role: 'Student' }, { role: 'Parent' }] }).then((docs) => {
        res.json({ searchUsersArray: docs });
    });
});
//30- Business Logic: addResult (After passing Test)
app.post("/results/addResult", (req, res) => {
    let result = new Result(req.body);
    result.save((err, doc) => {
        console.log("Here error", err);
        console.log("here doc", doc);
        if (err) {
            res.json({ isAdded: false });
        } else {
            res.json({ isAdded: true });
        }
    });

});
//31- Business Logic: getMyStudentsResult (Teacher)
app.get("/results/getMyStudentsResult/:idTeacher", (req, res) => {
    Result.find({ idTeacher: req.params.idTeacher }).then((docs) => {
        console.log(docs);
        res.json({ myStudentsResultArray: docs });
    });
});

//32- Business Logic: deleteOneResult (Teacher)
app.delete("/results/deleteResult/:id", (req, res) => {
    Result.deleteOne({ _id: req.params.id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });

});

//33- Business Logic: twilio (signupStudent)
app.get("/twilio/sendMessage/:tel", (req, res) => {
    client.messages
        .create({
            body: 'Welcome to Croco!',
            to: "+216" + req.params.tel, // Text your number
            from: '+12232153958', // From a valid Twilio number
        })
        .then((message) => {
            console.log(message.sid);
            res.json({ message: "sended" })
        });
});

//34- Business Logic: nodemailer (signupStudent)
app.post('/emails/sendEmail', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '',
            pass: '',
        },
    });
    const mailOptions = {
        from: 'stbchaabane@gmail.com',
        to: req.body.to,
        subject: "Croco-University",
        text: `Welcome to Croco University. You have been subscribed successfully!
                    Your account authentification:
                    Email: ${req.body.to}
                    Tel: ${req.body.tel} 
                    Password: ${req.body.password}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

//make app importable
module.exports = app;
