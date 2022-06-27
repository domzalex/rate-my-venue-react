const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcryptjs");
const Performers = require('./model');
const User = require('./user');
const router = express.Router();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use('/', router);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to DB.");
    app.listen(PORT, () => console.log("Web server running."));
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
        req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
        });
        }
    })(req, res, next);
});
app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
        }
    });
});
app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.route('/reviews').get( (req, res) => {
    Performers.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }   else {
            res.send(result);
        }
    }).sort({date: 1});
});


app.post('/create', async (req, res) => {
    const performers = new Performers({
        name: req.body.name,
        venue: req.body.venue,
        communication: req.body.communication,
        marketing: req.body.marketing,
        stage: req.body.stage,
        management: req.body.management,
        equipment: req.body.equipment,
        engineer: req.body.engineer,
        loadin: req.body.loadin,
        timing: req.body.timing,
        pay: req.body.pay,
        reliability: req.body.reliability,
        discount: req.body.discount,
        comments: req.body.comments
    });

    await performers.save();
    res.send("Review Created");
})
